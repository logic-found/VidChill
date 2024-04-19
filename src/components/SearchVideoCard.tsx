import { Link } from 'react-router-dom'
import ParseTimeandDate from '../utils/ParseTime&Date'

interface Props{
  video : any
}
const SearchVideoCard = ({ video } : Props) => {
  
  return (
    <Link className='w-[90%] h-fit flex flex-col items-center gap-5 px-1 py-2 text-sm sm:text-base hover:scale-[1.02] transition-transform duration-200 ease-in-out sm:flex-row sm:h-64 sm:w-[80%]' to={`/watch/${video.id?.videoId}`}>
      <img src={video?.snippet?.thumbnails?.medium?.url} className='w-full max-w-full h-56 sm:h-full sm:w-4/6 sm:min-w-4/6 object-cover rounded-lg' />
      <div className='flex flex-col gap-1 w-full  h-full'>
        <p className='line-clamp-2 font-semibold'>{video.snippet?.title}</p>
        <p className='line-clamp-2 text-zinc-300 font-bold'>{video.snippet?.channelTitle}</p>
        <div className='flex gap-1 text-zinc-300 '>
          <span>{ParseTimeandDate(video.snippet?.publishedAt)}</span>
        </div>
        <p className='line-clamp-1 sm:line-clamp-2 text-zinc-300 '>{video.snippet?.description}</p>
      </div>
    </Link>
  )
}

export default SearchVideoCard