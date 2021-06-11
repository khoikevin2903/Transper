import { createSlice } from '@reduxjs/toolkit';

const districtsEnd = createSlice({
    name: 'place',
    initialState: [],
    reducers: {
        setDistrictsEnd: (state, action) => {
            return action.payload;
        },
        defaultDistrictsEnd: (state, action) => {
            return [];
        }
    }
})

const { reducer, actions } = districtsEnd;
export const { setDistrictsEnd, defaultDistrictsEnd } = actions;
export default reducer;