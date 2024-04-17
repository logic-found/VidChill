import React, { useEffect, useRef, useState } from "react";
import useAxios from "../utils/useAxios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShimmerVideoPlayer from "../components/ShimmerUI/ShimmerVideoPlayer";
import FetchData from "../utils/FetchData";
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
import { LuBellRing as BellIcon } from "react-icons/lu";
import toast from "react-hot-toast";
import {
    IoIosArrowUp as ArrowUp,
    IoIosArrowDown as ArrowDown,
} from "react-icons/io";
import LiveChatMessage from "../components/LiveChatMessage";
import { AddMessage } from "../redux/LiveChatSlice";
import { LiveChatMessage as Message } from "../Types";
import { LiveChatData, GenerateRandomText } from "../utils/data";
import RecommendedVideoCard from "../components/RecommendedVideoCard";
import VideoComments from "../components/VideoComments";
import { ReduxRootState, ApiResponseType } from "../Types";



type EventType = React.ChangeEvent<HTMLInputElement>;

const WatchPage: React.FC = () => {
    const { id } = useParams();
    const [video, setVideo] = useState<any>(null);
    const dispatch = useDispatch();
    const messages = useSelector((state : ReduxRootState) => state.liveChat.messages);
    const videoUrl = `${process.env.VITE_APP_YOUTUBE_API}/${
        process.env.VITE_APP_YOUTUBE_VIDEO_DETAILS_ENDPOINT
    }&id=${id}`;
    const trendingVideoUrl = `${process.env.VITE_APP_YOUTUBE_API}/${
        process.env.VITE_APP_YOUTUBE_VIDEO_ENDPOINT
    }`;
    const { loading, data } : ApiResponseType = useAxios({
        method: "GET",
        url: videoUrl
    });
    const { data: trendingVideoData } : ApiResponseType = useAxios(
        { method: "GET", url: trendingVideoUrl}
    );
    const [channelDetailsLoading, setChannelDetailsLoading] = useState(false);
    const [channelDetails, setChannelDetails] = useState<any>(null);
    const [videoLike, setVideoLike] = useState<null | boolean>(null);
    const [subscribe, setSubscribe] = useState(false);
    const [showVideoFullDesc, setShowVideoFullDesc] = useState(false);
    const [trendingVideos, setTrendingVideos] = useState<null | []>(null);
    const [showLiveChat, setShowLiveChat] = useState(true);
    const [liveMessage, setLiveMessage] = useState('')
    const liveChatDivRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (data && data.items?.length) {
            const videoData = data?.items[0];
            const channelId = videoData?.snippet?.channelId;
            setVideo(videoData);
            fetchChannelData(channelId);
        }
    }, [data]);
    
    useEffect(() => {
        if (trendingVideoData && trendingVideoData.items) {
            setTrendingVideos(trendingVideoData.items);
        }
    }, [trendingVideoData]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const { avatar, name } =
            LiveChatData[Math.floor(Math.random() * LiveChatData.length)];
            const message = GenerateRandomText(20);
            dispatch(
                AddMessage({
                    avatar,
                    name,
                    message,
                })
            );
            
        }, 800);
        return () => clearInterval(interval);
    }, []);
    
    
    useEffect(() => {
        if (liveChatDivRef.current) {
        const {scrollTop, scrollHeight, clientHeight} = liveChatDivRef.current 
        if(scrollTop + clientHeight < scrollHeight-(clientHeight/2)) return 
        else {
            liveChatDivRef.current.scrollTop = liveChatDivRef.current.scrollHeight;
        }
    }
    }, [messages])

    const fetchChannelData = async (channelId: string) => {
        try {
            setChannelDetailsLoading(true);
            const channelUrl = `${process.env.VITE_APP_YOUTUBE_API}/${
                process.env.VITE_APP_YOUTUBE_CHANNEL_DETAILS_ENDPOINT
            }&id=${channelId}`;
            const response = await FetchData({
                method: "GET",
                url: channelUrl,
                data: null,
            });
            setChannelDetailsLoading(false);
            setChannelDetails(response?.items[0]);
        } catch (err) {
            setChannelDetailsLoading(false);
            console.log(err);
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
    
    const addLiveChatMessage = (e : any) => {
        if (e.code !== "Enter") return;
        dispatch(
            AddMessage({
                name: "Rashika Sahu",
                message: liveMessage,
                avatar: "../../public/Rashika_Sahu.jpeg",
            })
        );
        setLiveMessage('')
    };
    
    const toggleShowLiveChat = () => {
        setShowLiveChat((prevState) => !prevState);
    };
    

    
    return (
        <>
            <div className="w-full p-4 flex items-center justify-center">
                {(loading || channelDetailsLoading) && <ShimmerVideoPlayer />}
                {video && (
                    <div className="h-fit w-full sm:px-3 flex flex-col gap-2 md:flex-row md:gap-4">
                        {/* video player */}
                        <div className="flex flex-col gap-3 sm:gap-2  md:w-3/5 w-full">
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
                                        className={` ${
                                            subscribe
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
                                    className={`${
                                        showVideoFullDesc ? "" : "line-clamp-3"
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
                            <div className=" bg-transparent p-2 w-full overflow-x-auto">
                                <VideoComments/>
                            </div>
                        </div>

                        <div className="w-full md:w-2/5 flex flex-col gap-4 items-center">
                            {/* live chat */}
                            <div className=" border-[2px] border-zinc-700 h-fit w-full rounded  box-border">
                                <div className="  h-10 w-full text-center font-bold text-white border-b-[2px] border-zinc-700 ">
                                    <div
                                        className="h-full text-base md:text-lg cursor-pointer flex gap-2 justify-center items-center  py-2"
                                        onClick={toggleShowLiveChat}
                                    >
                                    {showLiveChat? "Hide ":"Show "}Live Chat
                                        {showLiveChat ? (
                                            <ArrowUp />
                                        ) : (
                                            <ArrowDown />
                                        )}
                                    </div>
                                </div>
                                {showLiveChat && (
                                    <div className="h-96">
                                        <div className="p-2 h-[87%] flex flex-col gap-2 overflow-y-scroll" ref={liveChatDivRef}>
                                            {messages.map(
                                                (message: Message) => (
                                                    <LiveChatMessage
                                                        message={message}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <div className="h-[13%] w-full border-t-[2px] border-zinc-700 p-1 px-2">
                                            <input
                                                type="text"
                                                className="w-full rounded h-full bg-transparent text-white px-2 py-1 font-semibold border-[1px] border-white"
                                                placeholder="Type Message.."
                                                onKeyDown={(e : any) => addLiveChatMessage(e)}
                                                value={liveMessage}
                                                onChange={(e : EventType) => setLiveMessage(e.target.value) }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* trending videos */}
                            {trendingVideos && (
                                <div className="flex flex-col gap-2 w-full ">
                                    {trendingVideos.map((video : any) => (
                                        <RecommendedVideoCard video={video} key={video.id}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WatchPage;
