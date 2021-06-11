import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const infoOtherUser = createAsyncThunk('user/login', async (params, thunkAPI) => {
    // const dataUser = await axios.get(`${Config.API_URL}/api/user-information/uname/${params.id}`, {
    //     headers: {
    //         'Authorization': `Bearer ${params.header}`
    //     }
    // }).then(res => thunkAPI.dispatch(saveUser(res.data)));
    // return dataUser;
})

const otherUser = createSlice({
    name: 'otherUser',
    initialState: {},
    reducers: {
        saveUser: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: {
        [infoOtherUser.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = otherUser;
export const { saveUser } = actions;
export default reducer;