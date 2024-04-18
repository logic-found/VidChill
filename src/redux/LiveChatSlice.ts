import { createSlice } from "@reduxjs/toolkit";
import { LiveChatInitialState } from '../Types';


const initialState: LiveChatInitialState = {
    messages: []
}

const LiveChatSlice = createSlice({
    name: 'liveChat',
    initialState,
    reducers: {
        ADD_MESSAGE: (state, action) => {
            let messages = [...state.messages, action.payload]
            if (messages.length > 50) {
                messages = messages.splice(messages.length - 50)
            }
            state.messages = messages
        },
        CLEAR_LIVE_CHAT_MESSAGES: (state) => {
            state.messages = []
        }
    }
})
export const { ADD_MESSAGE, CLEAR_LIVE_CHAT_MESSAGES } = LiveChatSlice.actions
export default LiveChatSlice.reducer
