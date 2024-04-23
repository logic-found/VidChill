import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SearchInitialState } from "../Types";
import FetchData from "../utils/FetchData";
import ErrorHandler from "../utils/ErrorHandler";

const initialState : SearchInitialState = {
    searchKeyword : '',
    loading : false,
    searchResults : null,
    searchSuggestionCache : {
        '' : ['namaste javascript', 'namaste react', 'react project', 'news', 'node.js tutorials', 'motivation', 'dance']
    }
}

export const getSearchResults = createAsyncThunk('GET_SEARCH_RESULTS', async (keyword : string, thunkAPI) => {
    try{
        const url = `${import.meta.env.VITE_APP_YOUTUBE_API}/${import.meta.env.VITE_APP_SEARCH_VIDEO_ENDPOINT}&q=${keyword}`
        return await FetchData({method: 'GET', url})
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const SearchSlice = createSlice({
    name : 'search',
    initialState,
    reducers : {
        SET_SEARCH_KEYWORD : (state, action) => {
            state.searchKeyword = action.payload
        },
        CLEAR_SEARCH_KEYWORD : (state) => {
            state.searchKeyword = ""
        },
        SET_SEARCH_SUGGESTION_CACHE : (state, action) => {
            const {key, value} = action.payload
            state.searchSuggestionCache[key.toString()] = value
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getSearchResults.pending, (state) => {
            state.loading = true
            state.searchResults = null
        })
        .addCase(getSearchResults.fulfilled, (state, action) => {
            state.loading = false
            state.searchResults = action.payload
        })
        .addCase(getSearchResults.rejected, (state, action) => {
            state.loading = false
            ErrorHandler(action.payload)
        })
    }
})

export default SearchSlice.reducer
export const {SET_SEARCH_KEYWORD, CLEAR_SEARCH_KEYWORD, SET_SEARCH_SUGGESTION_CACHE } = SearchSlice.actions