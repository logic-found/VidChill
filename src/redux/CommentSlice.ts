import { createSlice } from '@reduxjs/toolkit'
import { CommentsInitialState, Comment } from '../Types';
import { CommentsData } from '../utils/data';
import { addCommentFun } from '../utils/addComment';
import toast from 'react-hot-toast';


const initialState: CommentsInitialState = {
    comments: CommentsData
}

const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        ADD_COMMENT: (state, action) => {
            const { parentId, message } = action.payload
            if(!parentId){                                              // root level comment
                state.comments.push({
                    id : new Date().getSeconds(),
                    name : 'Rashika Sahu',
                    avatar : '/Rashika_Sahu.jpeg',
                    message,
                    replies : []
                })
            }
            else {
                const comments : Comment[] = addCommentFun(state.comments, parentId, message, {value : false} )
                state.comments = comments
            }
            toast.success("Comment Added")
        },
        CLEAR_COMMENT : (state) => {
            state.comments =  CommentsData
        }

    }
})


export const { ADD_COMMENT, CLEAR_COMMENT} = CommentsSlice.actions
export default CommentsSlice.reducer