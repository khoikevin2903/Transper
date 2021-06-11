import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const fetchUser = createAsyncThunk('fetchUser', async (params, thunkAPI) => {
    const dataUser = await axios.get(`${Config.API_URL}/api/users/all`, {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }).then(res =>thunkAPI.dispatch(saveListUser(res.data)));
    return dataUser;
})

const FetchAllUser = createSlice({
    name: 'FetchAllUser',
    initialState: [],
    reducers: {
        saveListUser: (state, action) => {
            return action.payload.reverse();
        },
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = FetchAllUser;
export const {saveListUser} = actions;
export default reducer;