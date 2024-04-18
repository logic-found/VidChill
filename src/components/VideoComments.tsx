import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../Types'
import { ADD_COMMENT } from '../redux/CommentSlice';
import { RootState } from "../redux/store";


type EventType = React.ChangeEvent<HTMLInputElement>;

interface CommentListProps {
    comments: Comment[]
}

interface CommentCompProps {
    comment: Comment
}


const VideoComments = () => {
    const dispatch = useDispatch()
    const comments = useSelector((state : RootState) => state.comments.comments)
    const [rootComment, setRootComment] = useState('')

    
    const addRootCommentHandler = () => {
        dispatch(ADD_COMMENT({
            parentId: null,
            message: rootComment
        }))
        setRootComment('')
    }

    return (
        <div className='flex flex-col gap-2'>
            <p className="text-lg sm:text-2xl font-bold">Comments</p>
            <div className='flex flex-col gap-2 px-2 w-full md:w-[80%]'>
                <input type="text" className='py-1 px-2  text-sm sm:text-base bg-transparent border-b-[1px] border-zinc-700 focus:outline-none text-white rounded w-full ' placeholder='Add a reply..' value={rootComment} onChange={(e: EventType) => setRootComment(e.target.value)} />
                <div className="w-full flex justify-end gap-2">
                    <button className="rounded-full border-[1px] border-zinc-500 py-1 px-3 flex items-center justify-center" >Cancel</button>
                    <button className="rounded-full border-[1px] border-blue-500 py-1 px-3 flex items-center justify-center disabled:cursor-not-allowed" disabled={rootComment.length === 0} onClick={addRootCommentHandler}>Comment</button>
                </div>
            </div>
            <div className='text-white text-sm sm:text-base'>
                <CommentList comments={comments} />
            </div>
        </div>
    )
}
export default VideoComments



const CommentList = ({ comments }: CommentListProps) => {
    return (
        <>
            {comments.map((comment: Comment) =>
                <CommentComp comment={comment} key={comment.id}/>
            )}
        </>

    )
}


const CommentComp = ({ comment }: CommentCompProps) => {
    const dispatch = useDispatch()
    const [reply, setReply] = useState('')
    const [showAddReply, setShowAddReply] = useState(false)
    const [viewReply, setViewReply] = useState(false)

    const hideAddReply = () => {
        setShowAddReply(false)
        setReply("")
    }

    const ADD_COMMENTHandler = () => {
        dispatch(ADD_COMMENT({
            parentId: comment.id,
            message: reply
        }))
        setReply('')
        setViewReply(true)
    }

    return (
        <div className='flex gap-2 w-full pt-5'>
            <img src={comment.avatar} className='h-10 w-10 rounded-full' />
            <div className='flex flex-col gap-1 w-full'>
                <div className=' font-semibold'>{comment.name}</div>
                <div className=''>{comment.message}</div>
                <div className='flex gap-2  text-blue-500'>
                    {(comment.replies?.length > 0) && <div onClick={() => setViewReply((prevState) => !prevState)} className=' cursor-pointer'>{viewReply ? "Hide" : "Show"} Reply</div>}
                    {!showAddReply && <div className=' cursor-pointer' onClick={() => setShowAddReply((prevState) => !prevState)}>Add Reply</div>}
                </div>
                {showAddReply &&
                    <div className='flex flex-col gap-2 px-2 w-full md:w-[80%]'>
                        <input type="text" className='py-1 px-2  text-sm sm:text-base bg-transparent border-b-[1px] border-zinc-700 focus:outline-none text-white rounded w-full ' placeholder='Add a reply..' value={reply} onChange={(e: EventType) => setReply(e.target.value)} />
                        <div className="w-full flex justify-end gap-2">
                            <button className="rounded-full border-[1px] border-zinc-500 py-1 px-3 flex items-center justify-center" onClick={hideAddReply}>Cancel</button>
                            <button className="rounded-full border-[1px] border-blue-500 py-1 px-3 flex items-center justify-center disabled:cursor-not-allowed" disabled={reply.length === 0} onClick={ADD_COMMENTHandler}>Reply</button>
                        </div>
                    </div>
                }


                {/* replies */}
                {(comment.replies?.length > 0 && viewReply) &&
                    <div className='border-l-[2px] border-zinc-500 rounded pl-2 pt-2'><CommentList comments={comment.replies} /></div>}
            </div>
        </div>
    )
}