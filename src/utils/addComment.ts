import { Comment } from "../Types"

export const addCommentFun = (comments : Comment[] , parentCommentId : number, message : string, commentAdded : {value : boolean}) => {
    if(!comments.length) return []
    let commentsCopy : Comment[] = JSON.parse(JSON.stringify(comments))
    commentsCopy.map((comment : Comment) => {
        if(comment.id === parentCommentId){
            comment.replies.push({
                id : new Date().getTime(),
                name : 'Rashika Sahu',
                avatar : '../../public/Rashika_Sahu.jpeg',
                message,
                replies : []
            })
            commentAdded.value = true             // if new comment has been added then turn this value true
        }
        if(!commentAdded.value){   
            comment.replies = addCommentFun(comment.replies, parentCommentId, message, commentAdded)   // if new added is already added then dont make extra calls
        }
        return comment
    })
    return commentsCopy
}