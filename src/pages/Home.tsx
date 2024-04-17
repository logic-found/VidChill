import { useState, useEffect } from "react"
import Button from "../components/Button"
import { HomeCategoryList } from '../utils/data'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxios from '../utils/useAxios'
import VideoCard from "../components/VideoCard"
import ShimmerUI from '../components/ShimmerUI/ShimmerHomeVideoCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import FetchData from "../utils/FetchData"
import { ApiResponseType } from "../Types"
import { SET_SEARCH_KEYWORD } from "../redux/SearchSlice";


export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_VIDEO_ENDPOINT}`
  const { loading, data }: ApiResponseType = useAxios({ method: 'GET', url })
  const [videos, setVidoes] = useState<any[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      setVidoes(data?.items)
      setNextPageToken(data?.nextPageToken)
    }
  }, [data])

  const fetchMoreDataHandler = async () => {
    const url = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_VIDEO_ENDPOINT}&pageToken=${nextPageToken}`
    const response = await FetchData({
      method: 'GET',
      url,
    })
    const newVideosData = [...response?.items]
    setVidoes((prevState) => [...prevState, ...newVideosData])
    if (response.nextPageToken) setNextPageToken(response.nextPageToken)
    else setNextPageToken(null)
  }

  const onSearchKeywordSetHandler = (keyword: string) => {
    dispatch(SET_SEARCH_KEYWORD(keyword))
    navigate('/search');
  }


  return (
    <>
      <div className="w-full">
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full flex gap-4  px-2 text-sm sm:text-base overflow-x-auto mb-3 remove-scrollbar">
            {HomeCategoryList?.map((category, index) => <div className="" key={index} onClick={() => {
              onSearchKeywordSetHandler(category)
            }}><Button title={category} key={Math.random()} /></div>)}
          </div>
          <div className="">
            <div className="flex flex-wrap gap-3 items-center justify-center cursor-pointer ">
              {loading && <>{Array(9).fill(null).map((_, index) => (<ShimmerUI key={index} />))}</>}
            </div>
            {videos && <><InfiniteScroll
              className="flex flex-wrap gap-3 items-center justify-center cursor-pointer "
              dataLength={videos?.length || 0}
              next={fetchMoreDataHandler}
              hasMore={nextPageToken ? true : false}
              loader={<>{Array(6).fill(null).map((_, index) => (<ShimmerUI key={index} />))}</>}
              endMessage={<p className="text-3xl p-3 w-full text-center">✅ You are all caught up
              </p>}
            >
              {videos?.map((video) => <VideoCard video={video} key={video.id} />)}
            </InfiniteScroll></>}
          </div>
        </div>
      </div>
    </>
  )
}