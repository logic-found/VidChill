import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchData from "../utils/FetchData";
import ErrorHandler from "../utils/ErrorHandler";
import { VideoPlayerInitialState } from "../Types";

const initialState : VideoPlayerInitialState = {
    videoPlayer: {
        video: null,
        loading: false
    },
    channelDetails: {
        details: null,
        loading: false
    }
}


export const getVideoPlayerData = createAsyncThunk('GET_VIDEO_PLAYER_DATA', async (id: string, thunkAPI) => {
    try {
        const url = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_VIDEO_DETAILS_ENDPOINT}&id=${id}`;
        const response = await FetchData({ method: 'GET', url })
        const channelId = response.items[0]?.snippet?.channelId;
        thunkAPI.dispatch(getChannelDetails(channelId))
        return response     
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getChannelDetails = createAsyncThunk('GET_CHANNEL_DETAILS', async (channelId: string, thunkAPI) => {
    try {
        const channelUrl = `${process.env.VITE_APP_YOUTUBE_API}/${process.env.VITE_APP_YOUTUBE_CHANNEL_DETAILS_ENDPOINT
            }&id=${channelId}`;
        return await FetchData({
            method: "GET",
            url: channelUrl,
        });
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const VideoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState,
    reducers: {

    },
    extraReducers : (builder) => {
        builder 
        .addCase(getVideoPlayerData.pending, (state) => {
            state.videoPlayer.video = null
            state.videoPlayer.loading = true
        })
        .addCase(getVideoPlayerData.fulfilled, (state, action) => {
            const videoData = action.payload.items[0];
            state.videoPlayer.loading = false
            state.videoPlayer.video = videoData
        })
        .addCase(getVideoPlayerData.rejected, (state, action) => {
            state.videoPlayer.loading = false
            ErrorHandler(action.payload)
        })
        .addCase(getChannelDetails.pending, (state) => {
            state.channelDetails.loading = true
        })
        .addCase(getChannelDetails.fulfilled, (state, action) => {
            state.channelDetails.loading = false
            state.channelDetails.details = action.payload.items[0]
        })
        .addCase(getChannelDetails.rejected, (state, action) => {
            state.channelDetails.loading = false
            ErrorHandler(action.payload)
        })
    }
})


export default VideoPlayerSlice.reducer
