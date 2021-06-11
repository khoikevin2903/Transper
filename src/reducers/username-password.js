import { createSlice } from '@reduxjs/toolkit';


const account = createSlice({
    name: 'account',
    initialState: {
        current: {},
        isAuth: false
    },
    reducers: {
        saveUserPass: (state, action) => {
            return action.payload;
        }
    }
});

const { reducer, actions } = account;
export const { saveUserPass} = actions;
export default reducer;