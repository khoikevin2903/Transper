import {createSlice} from '@reduxjs/toolkit';

const districtsStart = createSlice({
    name: 'place',
    initialState: [],
    reducers: {
        setDistrictsStart: (state, action) => {
            return action.payload;
        },
        defaultDistrictsStart: (state, action) => {
            return [];
        }
    }
})

const {reducer, actions} = districtsStart;
export const {setDistrictsStart, defaultDistrictsStart} = actions;
export default reducer;