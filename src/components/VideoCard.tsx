import { Link } from 'react-router-dom'
import ParseCount from '../utils/ParseCount'


interface Props{
  video : any
}
const VideoCard = ({ video } : Props) => {
  return (
    <Link className='flex flex-col w-[90%] gap-1 h-[21rem] sm:h-96 text-sm sm:text-base sm:w-72 p-2 hover:scale-[1.05] transition-transform duration-200 ease-in-out' to={`/watch/${video.id}`}>
      <img src={video?.snippet?.thumbnails?.medium?.url} className='w-full  h-60 sm:w-96 rounded-lg max-w-full' />
      <div className='flex flex-col  gap-1 '>
        <p className='font-semibold line-clamp-2 '>{video.snippet?.title}</p>
        <p className='line-clamp-1 text-zinc-300 '>{video.snippet?.channelTitle}</p>
        <div className='flex gap-1 text-zinc-300 text-xs sm:text-sm'>
          <span>{ParseCount(video?.statistics?.viewCount)} views • {ParseCount(video?.statistics?.likeCount)} likes</span>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard



