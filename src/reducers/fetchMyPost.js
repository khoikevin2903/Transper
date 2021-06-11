import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchPost = createAsyncThunk('MyPost', async (params, thunkAPI) => {
    const dataUser = axios.get(`${Config.API_URL}/api/travel/uname/${params.username}`,
    {
        headers: {
            'Authorization': `Bearer ${params.header}`
        }
    }
    ).then(res => thunkAPI.dispatch(saveList(res.data)));
    return dataUser;
})

const FetchMyPost = createSlice({
    name: 'FetchMyPost',
    initialState: [],
    reducers: {
        saveList: (state, action) => {
            return action.payload.reverse();
        }
    },
    extraReducers: {
        [FetchPost.fulfilled]: (state, action) => {
           state = action.payload;
        }
    }
});

const { reducer, actions } = FetchMyPost;
export const { saveList} = actions;
export default reducer;