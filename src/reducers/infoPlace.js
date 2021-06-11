import {createSlice} from '@reduxjs/toolkit';

const infoPlace = createSlice({
    name: 'infoPlace',
    initialState: {
        startCity : null,
        startDistrict: null,
        endCity : null,
        endDistrict: null,
        startTime: null,
        startCalendar: null,
        endTime: null,
        endCalendar: null,
    },
    reducers: {
        ChangePlace: (state, action) => {
            return {...state, ...action.payload};
        },
        defaultPlace: (state, action) => {
            return {...state, 
                startCity : null,
                startDistrict: null,
                endCity : null,
                endDistrict: null,
                startTime: null,
                startCalendar: null,
                endTime: null,
                endCalendar: null,
            }
        }
    }
});

const {reducer, actions} = infoPlace;
export const {ChangePlace,defaultPlace} = actions;
export default reducer;