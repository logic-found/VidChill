import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from "react-redux";
import ShimmerUI from '../components/ShimmerUI/ShimmerSearchVideoCard'
import FetchData from "../utils/FetchData"
import SearchVideoCard from "../components/SearchVideoCard";
import ErrorHandler from "../utils/ErrorHandler";
import { ReduxRootState } from "../Types";
import { getSearchResults } from "../redux/SearchSlice";


const Search : React.FC = () => {
  const dispatch = useDispatch()
  const searchKeyword = useSelector((state : ReduxRootState) => state.search.searchKeyword)
  const searchResults : any = useSelector((state : ReduxRootState) => state.search.searchResults)
  const [loading, setLoading] = useState(false)
  const [nextPageToken, setNextPageToken] = useState(searchResults?.nextPageToken || null)
  const [videos, setVideos] = useState<any[]>(searchResults?.items)


  const fetchMoreDataHandler = async () => {
    try {
      setLoading(true)
      const url = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_SEARCH_VIDEO_ENDPOINT}&q=${searchKeyword}&pageToken=${nextPageToken}`
      const response = await FetchData({
        method: 'GET',
        url
      })
      const newVideosData = [...response?.items]
      setVideos((prevState ) => [...prevState, ...newVideosData])
      if (response.nextPageToken) setNextPageToken(response.nextPageToken)
      else setNextPageToken(null)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      ErrorHandler(err)
    }
  }

  useEffect(() => {
    setVideos(searchResults?.items)
    setNextPageToken(searchResults?.nextPageToken)
  }, [searchResults])

  useEffect(() => {
    dispatch(getSearchResults(searchKeyword))
  }, [])


  return (
    <>
      <div className="flex justify-center p-4 w-[100vw]">
        <div className="w-full flex flex-col gap-3 items-center">
          {loading && Array(6).fill(null).map(() => (<ShimmerUI key={Math.random()} />))}
          {videos && <InfiniteScroll
            className="flex flex-wrap gap-5 items-center justify-center cursor-pointer p-2 sm:p-4"
            dataLength={videos?.length || 0}
            next={fetchMoreDataHandler}
            hasMore={nextPageToken ? true : false}
            loader={Array(6).fill(null).map(() => (<ShimmerUI key={Math.random()} />))}
            endMessage={<p className="text-3xl p-3 w-full text-center">✅ You are all caught up</p>}>
            {videos?.map((video) => <SearchVideoCard video={video} key={video.id?.videoId} />)}
          </InfiniteScroll>}

        </div>

      </div>
    </>
  )
}

export default Search