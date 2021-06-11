import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchListActive = createAsyncThunk('user/FetchListActive', async (params, thunkAPI) => {
    const dataUser = await axios.get(`${Config.API_URL}/api/active/active-users`, {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }).then(res => thunkAPI.dispatch(saveList(res.data)));
    return dataUser;
})

const ActiveUser = createSlice({
    name: 'ActiveUser',
    initialState:[],
    reducers: {
        saveList: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {

        [FetchListActive.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = ActiveUser;
export const { saveList } = actions;
export default reducer;