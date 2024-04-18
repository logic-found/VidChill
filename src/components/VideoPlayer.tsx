import { useState, useEffect } from 'react'
import ParseCount from "../utils/ParseCount";
import ParseTimeandDate from "../utils/ParseTime&Date";
import {
    FiThumbsUp as ThumbUp,
    FiThumbsDown as ThumbDown,
} from "react-icons/fi";
import {
    MdThumbUp as LikeThumb,
    MdThumbDown as DislikeThumb,
} from "react-icons/md";
import {
    IoIosArrowUp as ArrowUp,
    IoIosArrowDown as ArrowDown,
} from "react-icons/io";
import { LuBellRing as BellIcon } from "react-icons/lu";
import { ApiResponseType } from "../Types";
import { useDispatch } from 'react-redux';
import useAxios from '../utils/useAxios';
import toast from 'react-hot-toast';
import ErrorHandler from '../utils/ErrorHandler';
import FetchData from '../utils/FetchData';


interface Props {
    id: string | undefined,
    video : any
}
const VideoPlayer = ({ id, video }: Props) => {
    const dispatch = useDispatch();
    const videoUrl = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_VIDEO_DETAILS_ENDPOINT
        }&id=${id}`;
    const { loading, data }: ApiResponseType = useAxios({
        method: "GET",
        url: videoUrl,
        dependency : [id]
    });
    const [channelDetails, setChannelDetails] = useState<any>(null);
    const [videoLike, setVideoLike] = useState<null | boolean>(null);
    const [subscribe, setSubscribe] = useState(false);
    const [showVideoFullDesc, setShowVideoFullDesc] = useState(false);
    const [channelDetailsLoading, setChannelDetailsLoading] = useState(false);


    useEffect(() => {
        if (data && data.items?.length) {
            const videoData = data?.items[0];
            const channelId = videoData?.snippet?.channelId;
            setVideo(videoData);
            fetchChannelData(channelId);
        }
    }, [data]);

    const fetchChannelData = async (channelId: string) => {
        try {
            setChannelDetailsLoading(true);
            const channelUrl = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_CHANNEL_DETAILS_ENDPOINT
                }&id=${channelId}`;
            const response = await FetchData({
                method: "GET",
                url: channelUrl,
            });
            setChannelDetailsLoading(false);
            setChannelDetails(response?.items[0]);
        } catch (err) {
            setChannelDetailsLoading(false);
            ErrorHandler(err)
        }
    };


    const toggleVideoLike = (condition: string) => {
        setVideoLike(() => {
            if (condition == "like") return true;
            else return false;
        });
    };

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                toast.success("Link Copied to Clipboard");
            })
            .catch((error) => {
                console.log(error)
                toast.error("Error! please try again later!");
            });
    };


    return (
        <>
            
            <>
                <iframe
                    // width="700"
                    // height="350"
                    className="rounded w-full h-60 sm:h-80 md:h-96"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                {/* desc section */}
                <div className=" font-semibold  text-base sm:text-xl">
                    {video.snippet?.title}
                </div>
                {/* channel name , like , subscribe */}
                <div className="flex flex-col gap-3 md:flex-row md:gap-1 justify-between w-full items-center ">
                    {/* channel details */}
                    <div className="flex  gap-3 justify-between md:justify-start items-center w-full md:w-fit">
                        {channelDetails && (
                            <div className="flex gap-1 items-center">
                                <img
                                    src={
                                        channelDetails?.snippet
                                            ?.thumbnails?.medium
                                            ?.url
                                    }
                                    alt=""
                                    className="rounded-full h-10 w-10  sm:h-14 sm:w-14"
                                />
                                <div className="flex flex-col gap-1 text-sm sm:text-lg">
                                    <div>
                                        {
                                            channelDetails?.snippet
                                                ?.title
                                        }
                                    </div>
                                    <div className=" text-slate-400 text-xs sm:text-sm">
                                        {ParseCount(
                                            channelDetails
                                                ?.statistics
                                                ?.subscriberCount
                                        )}{" "}
                                        subscribers
                                    </div>
                                </div>
                            </div>
                        )}
                        <div
                            className={` ${subscribe
                                ? "bg-gradient-to-r from-pink-500 to-amber-500"
                                : "bg-white"
                                } h-fit text-zinc-900  font-semibold  text-sm sm:text-base px-3 py-1 rounded-2xl flex gap-1 items-center cursor-pointer`}
                            onClick={() =>
                                setSubscribe(
                                    (prevState: boolean) =>
                                        !prevState
                                )
                            }
                        >
                            {subscribe && <BellIcon />}
                            {subscribe ? "Subscribed" : "Subscribe"}
                        </div>
                    </div>

                    <div className="flex gap-2 w-full justify-between md:justify-start md:w-fit text-sm sm:text-base">
                        {/* like & dislike */}
                        <div className="h-fit text-zinc-900 bg-white font-semibold   px-2 py-1 flex gap-3 rounded-2xl">
                            <div className="flex gap-1 items-center ">
                                <div
                                    className={`text-xl cursor-pointer`}
                                    onClick={() =>
                                        toggleVideoLike("like")
                                    }
                                >
                                    {videoLike ? (
                                        <LikeThumb />
                                    ) : (
                                        <ThumbUp />
                                    )}
                                </div>
                                <div>
                                    {ParseCount(
                                        video?.statistics?.likeCount
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 items-center rounded-l-2xl">
                                <button
                                    className={`text-xl cursor-pointer`}
                                    onClick={() =>
                                        toggleVideoLike("dislike")
                                    }
                                >
                                    {videoLike == false ? (
                                        <DislikeThumb />
                                    ) : (
                                        <ThumbDown />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* share */}
                        <button
                            className="h-fit text-zinc-900 bg-white font-semibold px-2 py-1 flex gap-3 rounded-2xl"
                            onClick={copyUrl}
                        >
                            Share
                        </button>
                    </div>
                </div>
                {/* description */}
                <div className="bg-zinc-700 rounded p-3 text-white text-xs sm:text-base ">
                    <div className="font-semibold flex gap-2 w-full">
                        {ParseCount(video.statistics?.viewCount)}{" "}
                        Views •{" "}
                        {ParseTimeandDate(
                            video.snippet?.publishedAt
                        )}
                    </div>
                    <div
                        className={`${showVideoFullDesc ? "" : "line-clamp-3"
                            }`}
                    >
                        {video.snippet?.description}
                    </div>
                    {video.snippet?.description.length > 300 && (
                        <div
                            className="font-semibold pt-2 cursor-pointer"
                            onClick={() =>
                                setShowVideoFullDesc(
                                    (prevState) => !prevState
                                )
                            }
                        >
                            {showVideoFullDesc ? (
                                <p className="flex gap-2 items-center">
                                    Show Less <ArrowUp />
                                </p>
                            ) : (
                                <p className="flex gap-2 items-center">
                                    Show More <ArrowDown />
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </>
        </>
    )
}

export default VideoPlayer