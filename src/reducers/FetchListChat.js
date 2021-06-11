import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchChat = createAsyncThunk('user/fetchList', async (params, thunkAPI) => {
    const dataUser = await axios.get(`${Config.API_URL}/api/chatroom/me/${params.id}`, {
        headers: {
            'Authorization': `Bearer ${params.header}`
        }
    }).then(res => thunkAPI.dispatch(saveList(res.data)));
    return dataUser;
})

const FetchListChat = createSlice({
    name: 'FetchListChat',
    initialState:[],
    reducers: {
        saveList: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {

        [FetchChat.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = FetchListChat;
export const { saveList } = actions;
export default reducer;