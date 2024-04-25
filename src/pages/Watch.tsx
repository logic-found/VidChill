import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShimmerVideoPlayer from "../components/ShimmerUI/ShimmerVideoPlayer";
import { CLEAR_LIVE_CHAT_MESSAGES } from "../redux/LiveChatSlice";
import RecommendedVideoCard from "../components/RecommendedVideoCard";
import VideoComments from "../components/VideoComments";
import { ApiResponseType } from "../Types";
import { RootState, AppDispatch } from "../redux/store";
import { getVideoPlayerData } from "../redux/VideoPlayerSlice";
import { CLEAR_COMMENT } from '../redux/CommentSlice'
import VideoPlayer from "../components/VideoPlayer";
import LiveChat from "../components/LiveChat";


const WatchPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const { data: trendingVideoData }: ApiResponseType = useAxios(
        {
            method: "GET", 
            url: `${import.meta.env.VITE_APP_YOUTUBE_API}/${import.meta.env.VITE_APP_YOUTUBE_VIDEO_ENDPOINT}`
        }
    );
    const { video, loading } = useSelector((state: RootState) => state.videoPlayer.videoPlayer)
    const { loading: channelDetailsLoading } = useSelector((state: RootState) => state.videoPlayer.channelDetails)
    const [trendingVideos, setTrendingVideos] = useState<null | []>(null);
    

    useEffect(() => {
        if (trendingVideoData && trendingVideoData.items) {
            setTrendingVideos(trendingVideoData.items);
        }
    }, [trendingVideoData]);

    

    useEffect(() => {
        if (id) dispatch(getVideoPlayerData(id))
        return () => {
            dispatch(CLEAR_LIVE_CHAT_MESSAGES())
            dispatch(CLEAR_COMMENT())
        }
    }, [id])


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
                            <LiveChat/>

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
