import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FormDatePicker = (props) => {

    const { HandleChange, dob } = props;

    const [startDate, setStartDate] = useState(new Date(dob));

    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <div className="rounded cursor-pointer mx-3">
                <div className="py-2 px-2 rounded border border-gray-400" onClick={onClick} ref={ref}>
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
                HandleChange(date);
            }}
            customInput={<ExampleCustomInput />}
        />
    );
};


export default FormDatePicker;