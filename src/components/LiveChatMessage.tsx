import { LiveChatMessage as Message } from '../Types'


interface Props {
    message : Message
}
const LiveChatMessage = ({ message } : Props) => {
    
  return (
    <div className='w-full flex gap-2  items-center  text-sm sm:text-base '>
        <img className=' h-9 w-9 rounded-full object-cover' src={message.avatar}/>
        <span className=' font-semibold text-slate-500'>{message.name}</span>
        <span>{message.message}</span>
    </div>
  )
}

export default LiveChatMessage