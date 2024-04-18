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

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store