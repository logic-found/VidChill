import {  configureStore } from "@reduxjs/toolkit";
import LiveChatSlice from "./LiveChatSlice";
import CommentSlice from "./CommentSlice";
import SearchSlice from "./SearchSlice";


const reducer = {
    liveChat : LiveChatSlice,
    comments : CommentSlice,
    search : SearchSlice
}
const store = configureStore({
    reducer,
})


export default store