import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from "react-redux";
import ShimmerUI from '../components/ShimmerUI/ShimmerSearchVideoCard'
import FetchData from "../utils/FetchData"
import SearchVideoCard from "../components/SearchVideoCard";
import ErrorHandler from "../utils/ErrorHandler";
import { getSearchResults } from "../redux/SearchSlice";
import { AppDispatch, RootState } from "../redux/store";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const searchKeyword = useSelector((state: RootState) => state.search.searchKeyword)
  const searchResults: any = useSelector((state: RootState) => state.search.searchResults)
  const loading: any = useSelector((state: RootState) => state.search.loading)
  const [nextPageToken, setNextPageToken] = useState(searchResults?.nextPageToken || null)
  const [videos, setVideos] = useState<any[]>(searchResults?.items)


  const fetchMoreDataHandler = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_YOUTUBE_API}/${import.meta.env.VITE_APP_SEARCH_VIDEO_ENDPOINT}&q=${searchKeyword}&pageToken=${nextPageToken}`
      const response = await FetchData({
        method: 'GET',
        url
      })
      const newVideosData = [...response?.items]
      setVideos((prevState) => [...prevState, ...newVideosData])
      if (response.nextPageToken) setNextPageToken(response.nextPageToken)
      else setNextPageToken(null)
    } catch (err) {
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
      <div className="flex justify-center p-4 max-w-[100vw]">
        <div className="w-full flex flex-col gap-3 items-center">
          {loading && Array(6).fill(null).map(() => (<ShimmerUI key={Math.random()} />))}
          {videos && <InfiniteScroll
            className="flex flex-wrap gap-5 items-center justify-center cursor-pointer p-2 sm:p-4"
            dataLength={videos?.length || 0}
            next={fetchMoreDataHandler}
            hasMore={nextPageToken ? true : false}
            loader={Array(6).fill(null).map(() => (<ShimmerUI key={Math.random()} />))}
            endMessage={<></>}>
            {videos?.map((video) => <SearchVideoCard video={video} key={video.id?.videoId} />)}
          </InfiniteScroll>}
          {!videos && 
            <div className="flex flex-col gap-2 text-base sm:text-xl pt-5 text-white text-center">
              <div className="font-semibold">No results found</div>
              <div>Please try with a different keyword
              </div>
            </div>
          }

        </div>

      </div>
    </>
  )
}

export default Search