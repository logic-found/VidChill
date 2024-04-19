import React, { useEffect, useRef, useState } from "react";
import useAxios from "../utils/useAxios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShimmerVideoPlayer from "../components/ShimmerUI/ShimmerVideoPlayer";
import {
    IoIosArrowUp as ArrowUp,
    IoIosArrowDown as ArrowDown,
} from "react-icons/io";
import LiveChatMessage from "../components/LiveChatMessage";
import { ADD_MESSAGE, CLEAR_LIVE_CHAT_MESSAGES } from "../redux/LiveChatSlice";
import { LiveChatMessage as Message } from "../Types";
import { LiveChatData, GenerateRandomText } from "../utils/data";
import RecommendedVideoCard from "../components/RecommendedVideoCard";
import VideoComments from "../components/VideoComments";
import { ApiResponseType } from "../Types";
import { RootState, AppDispatch } from "../redux/store";
import { getVideoPlayerData } from "../redux/VideoPlayerSlice";
import { CLEAR_COMMENT } from '../redux/CommentSlice'
import VideoPlayer from "../components/VideoPlayer";

type EventType = React.ChangeEvent<HTMLInputElement>;

const WatchPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state: RootState) => state.liveChat.messages);
    const { data: trendingVideoData }: ApiResponseType = useAxios(
        {
            method: "GET", 
            url: `${import.meta.env.VITE_APP_YOUTUBE_API}/${import.meta.env.VITE_APP_YOUTUBE_VIDEO_ENDPOINT}`
        }
    );
    const { video, loading } = useSelector((state: RootState) => state.videoPlayer.videoPlayer)
    const { loading: channelDetailsLoading } = useSelector((state: RootState) => state.videoPlayer.channelDetails)
    const [trendingVideos, setTrendingVideos] = useState<null | []>(null);
    const [showLiveChat, setShowLiveChat] = useState(true);
    const [liveMessage, setLiveMessage] = useState('')
    const liveChatDivRef = useRef<null | HTMLDivElement>(null)


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
            const id = Math.random().toString()+message
            dispatch(
                ADD_MESSAGE({
                    id,
                    avatar,
                    name,
                    message,
                })
            );
        }, 800);

        return () => {
            clearInterval(interval);
        }
    }, []);


    useEffect(() => {
        if (id) dispatch(getVideoPlayerData(id))
        return () => {
            dispatch(CLEAR_LIVE_CHAT_MESSAGES())
            dispatch(CLEAR_COMMENT())
        }
    }, [id])

    useEffect(() => {
        if (liveChatDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = liveChatDivRef.current
            if (scrollTop + clientHeight < scrollHeight - (clientHeight / 2)) return
            else {
                liveChatDivRef.current.scrollTop = liveChatDivRef.current.scrollHeight;
            }
        }
    }, [messages])


    
    const addLiveChatMessage = (e: any) => {
        if (e.code !== "Enter") return;
        dispatch(
            ADD_MESSAGE({
                id : Math.random().toString()+liveMessage,
                name: "Rashika Sahu",
                message: liveMessage,
                avatar: "/Rashika_Sahu.jpeg",
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
                            <VideoPlayer id={id}/>
                            {/* comments */}
                            <div className=" bg-transparent p-2 w-full overflow-x-auto">
                                <VideoComments />
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
                                        {showLiveChat ? "Hide " : "Show "}Live Chat
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
                                                        key={message.id}
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
                                                onKeyDown={(e: any) => addLiveChatMessage(e)}
                                                value={liveMessage}
                                                onChange={(e: EventType) => setLiveMessage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* trending videos */}
                            {trendingVideos && (
                                <div className="flex flex-col gap-2 w-full ">
                                    {trendingVideos.map((video: any) => (
                                        <RecommendedVideoCard video={video} key={video.id} />
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
