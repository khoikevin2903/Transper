import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Config from '../constants/Config';

export const FetchConversation = createAsyncThunk('user/fetchList', async (params, thunkAPI) => {
    const dataUser = await axios.post(`${Config.API_URL}/api/getChatId`, {
        senderId: params.senderId, recipientId: params.recipientId
    }, {
        headers: {
            'Authorization': `Bearer ${params.header}`
        }
    }).then(res => thunkAPI.dispatch(saveConversation({id: res.data.id, listMess: res.data.messages})))
    return dataUser;
})

const Conversation = createSlice({
    name: 'FetchListChat',
    initialState: {},
    reducers: {
        saveConversation: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {

        [FetchConversation.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = Conversation;
export const { saveConversation } = actions;
export default reducer;