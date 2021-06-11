import {createSlice} from '@reduxjs/toolkit';

const showModal = createSlice({
    name: 'showModal',
    initialState: false,
    reducers: {
        onModal: (state, action) => {
            return true;
        },
        offModal: (state, action) => {
            return false;
        }
    }
});

const {reducer, actions} = showModal;
export const {onModal, offModal} = actions;
export default reducer;