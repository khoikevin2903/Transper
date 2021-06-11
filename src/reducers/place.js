import {createSlice} from '@reduxjs/toolkit';

const place = createSlice({
    name: 'place',
    initialState: null,
    reducers: {
        setData: (state, action) => {
            return action.payload;
        }
    }
})

const {reducer, actions} = place;
export const {setData} = actions;
export default reducer;