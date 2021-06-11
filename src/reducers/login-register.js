import {createSlice} from '@reduxjs/toolkit';

const LoginRegister = createSlice({
    name: 'LoginRegister',
    initialState: 0,
    reducers: {
        onLogin: (state, action) => {
            return 0;
        },
        onRegister: (state, action) => {
            return 1;
        }
    }
});

const {reducer, actions} = LoginRegister;
export const {onLogin, onRegister} = actions;
export default reducer;