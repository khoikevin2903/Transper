import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import {ChangePlace} from '../../../../../reducers/infoPlace';
import {ChangePlaceName} from '../../../../../reducers/infoPlaceName';
import moment from 'moment';

const FormDatePicker = (props) => {

    const { name } = props;

    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());

    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <div className="shadow p-2 rounded cursor-pointer">
                <div className="py-2 px-14 rounded border border-gray-400" onClick={onClick} ref={ref}>
                    {value}
                </div>
            </div>
        ),
    );
    return (
        <DatePicker
            selected={startDate}
            onChange={date => {
                setStartDate(date);
                dispatch(ChangePlace({[name]: moment(date).format().substring(0,11)}));
                dispatch(ChangePlaceName({[name]: moment(date).format().substring(0,11)}))

            }}
            customInput={<ExampleCustomInput />}
        />
    );
};


export default FormDatePicker;