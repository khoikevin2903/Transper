import {createSlice} from '@reduxjs/toolkit';

const options = createSlice({
    name: 'option',
    initialState: 0,
    reducers: {
        changeOption : (state, action) => {
            return action.payload;
        },
        defaultOptionLeft : (state) => {
            return 0;
        }
    }
})

const {reducer, actions} = options;
export const {changeOption, defaultOptionLeft} = actions;
export default reducer;