import { createSlice } from "@reduxjs/toolkit";
import { LiveChatInitialState } from '../Types';


const initialState: LiveChatInitialState = {
    messages: []
}

const LiveChatSlice = createSlice({
    name: 'liveChat',
    initialState,
    reducers: {
        AddMessage: (state, action) => {
            let messages = [...state.messages, action.payload]
            if (messages.length > 50) {
                messages = messages.splice(messages.length - 50)
            }
            state.messages = messages
        }
    }
})
export const { AddMessage } = LiveChatSlice.actions
export default LiveChatSlice.reducer
