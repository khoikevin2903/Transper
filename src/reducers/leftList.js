import {createSlice} from '@reduxjs/toolkit';

const leftList = createSlice({
    name: 'leftlist',
    initialState: true,
    reducers: {
        onList: (state, action) => {
            return true;
        },
        offList: (state, action) => {
            return false;
        }
    }
});

const {reducer, actions} = leftList;
export const {onList, offList} = actions;
export default reducer;