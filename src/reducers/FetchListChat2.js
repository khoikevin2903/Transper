import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchChat2 = createAsyncThunk('user/fetchList', async (params, thunkAPI) => {
    const dataUser = await axios.get(`${Config.API_URL}/api/chatroom/me2/${params.id}`, {
        headers: {
            'Authorization': `Bearer ${params.header}`
        }
    }).then(res => thunkAPI.dispatch(saveList2(res.data)));
    return dataUser;
})

const FetchListChat2 = createSlice({
    name: 'FetchListChat',
    initialState:[],
    reducers: {
        saveList2: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {

        [FetchChat2.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = FetchListChat2;
export const { saveList2 } = actions;
export default reducer;