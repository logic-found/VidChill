import { Method } from 'axios';


export interface SearchInitialState{
    searchKeyword : string,
    searchSuggestionCache : { [key: string]: (string | number)[] }
    loading : boolean, 
    searchResults : any[] | null
}
export interface ApiFormat{
    url : string,
    method : Method,
    dependency? : any[],
    headers? : {}
}
export interface LiveChatMessage{
    avatar : string,
    name : string,
    message : string,
    id : string | number
}

export interface LiveChatInitialState {
    messages : LiveChatMessage[]
}
export interface VideoPlayerInitialState {
    videoPlayer : {
        video : any,
        loading : boolean
    },
    channelDetails : {
        details : any,
        loading : boolean
    }
}
export interface Comment {
    id : number,
    avatar : string,
    name : string,
    message : string,
    replies : Comment[]
}

export interface CommentsInitialState {
    comments: Comment[]
}

export interface ApiResponseType {
    loading : boolean,
    data : any
}