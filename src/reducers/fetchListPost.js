import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchList = createAsyncThunk('fetchList', async (params, thunkAPI) => {

    const dataUser = axios.get(`${Config.API_URL}/api/travel/all`,
    {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }
    ).then(res => thunkAPI.dispatch(saveList(res.data)));
    return dataUser;
})

const FetchListPost = createSlice({
    name: 'FetchListPost',
    initialState: [],
    reducers: {
        saveList: (state, action) => {
            return action.payload.reverse();
        },
        addList: (state, action) => {
            //return action.payload;
            //console.log(action.payload)
        },
        defaultList : (state, action) => {
            return [];
        }
    },
    extraReducers: {
        [FetchList.fulfilled]: (state, action) => {
           state = action.payload;
        }
    }
});

const { reducer, actions } = FetchListPost;
export const { saveList, addList, defaultList} = actions;
export default reducer;