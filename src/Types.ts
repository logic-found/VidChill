export interface SearchInitialState{
    searchKeyword : string,
    searchSuggestionCache : { [key: string]: [] }
    loading : boolean, 
    searchResults : any[] | null
}
export interface ApiFormat{
    url : string,
    method : string,
}
export interface LiveChatMessage{
    avatar : string,
    name : string,
    message : string
}

export interface LiveChatInitialState {
    messages : LiveChatMessage[]
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

export interface ReduxRootState {
    liveChat : LiveChatInitialState,
    comments : CommentsInitialState,
    search : SearchInitialState
}


export interface ApiResponseType {
    loading : boolean,
    data : any
}