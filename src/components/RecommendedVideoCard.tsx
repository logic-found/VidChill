import { Link } from 'react-router-dom'
import ParseTimeandDate from '../utils/ParseTime&Date'
import ParseCount from '../utils/ParseCount'

interface Props{
  video : any
}
const RecommendedVideoCard = ({ video } : Props) => {
  return (
    <Link className='w-full h-fit flex gap-2 items-center px-1 py-2 text-xs sm:text-sm hover:scale-[1.01] transition-transform duration-200 ease-in-out' to={`/watch/${video.id?.videoId}`}>
      <img src={video?.snippet?.thumbnails?.medium?.url} className=' h-32  w-3/6 object-cover rounded-lg' />
      <div className='flex flex-col gap-1 w-3/6'>
        <p className='font-semibold line-clamp-2  text-sm sm:text-base '>{video.snippet?.title}</p>
        <p className='line-clamp-2 text-zinc-300 font-semibold'>{video.snippet?.channelTitle}</p>
        <div className='flex flex-col gap-1 text-zinc-300 '>
          <span>{ParseTimeandDate(video.snippet?.publishedAt)}</span>
          <span>{ParseCount(video?.statistics?.viewCount)} views • {ParseCount(video?.statistics?.likeCount)} likes</span>
        </div>
        
      </div>
    </Link>
  )
}

export default RecommendedVideoCard