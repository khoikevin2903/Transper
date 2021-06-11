import {createSlice} from '@reduxjs/toolkit';

const infoPlaceName = createSlice({
    name: 'infoPlaceName',
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
        ChangePlaceName: (state, action) => {
            return {...state, ...action.payload};
        },
        defaultPlaceName: (state, action) => {
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

const {reducer, actions} = infoPlaceName;
export const {ChangePlaceName,defaultPlaceName} = actions;
export default reducer;