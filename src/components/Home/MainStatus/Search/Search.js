import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import FormPlace from './FormPlace';
import Transport from '../../../../constants/Transport';
import moment from 'moment';
import axios from 'axios';
import * as Config from '../../../../constants/Config';
import { saveList, FetchList } from '../../../../reducers/fetchListPost';
import './Search.scss'

function Search(props) {

    const dispatch = useDispatch();

    const Place = useSelector(state => state.Place);

    const [loading, setLoading] = useState(false);

    const User = useSelector(user => user.CheckLogin);

    const [search, setSearch] = useState({
        fromTime: new Date(),
        toTime: new Date(),
        transport: '',
        fromCity: '',
        fromDistrict: '',
        toCity: '',
        toDistrict: '',
        username: ''
    });

    const [startTime, setStartTime] = useState(new Date());

    const [endTime, setEndTime] = useState(new Date());

    const elm = Transport ? Transport.map((arr, index) => {
        return <option value={arr} key={index} className="text-sm opacity-70">{arr}</option>
    }) : "";

    const HandleChangeSearch = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setSearch({ ...search, [name]: value });
    }

    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <div className="rounded cursor-pointer ">
                <div className="" onClick={onClick} ref={ref}>
                    {value}
                </div>
            </div>
        ),
    );

    const HandleChangePlace = (place) => {
        setSearch({ ...search, ...place });
    }

    const HandleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        let obj = {};
        if (moment(startTime).format().substring(0, 19) !== moment(endTime).format().substring(0, 19)) {
            obj = {
                ...obj, fromTime: moment(startTime).format().substring(0, 19),
                toTime: moment(endTime).format().substring(0, 19),
            }
        }
        if (search.username !== "") {
            obj = { ...obj, word: search.username };
        }
        if (search.transport !== "") obj = { ...obj, transport: search.transport };
        if (search.fromCity !== "" && search.fromDistrict !== "") obj = { ...obj, fromPlace: `${search.fromDistrict}-${search.fromCity}` };
        if (search.fromCity !== "" && search.fromDistrict === "") obj = { ...obj, fromPlace: `${search.fromCity}` };
        if (search.toCity !== "" && search.toDistrict !== "") obj = { ...obj, toPlace: `${search.toDistrict}-${search.toCity}` };
        if (search.toCity !== "" && search.toDistrict === "") obj = { ...obj, toPlace: `${search.toCity}` };
        if ((Object.values(obj).length === 0) === true) {
            dispatch(FetchList(User.current.accessToken));
        }
        else {
            axios.post(`${Config.API_URL}/api/travel/search`, obj, {
                headers: {
                    'Authorization': `Bearer ${User.current.accessToken}`
                }
            }).then(async res => {
                if (res.status === 200) {
                    await dispatch(saveList(res.data));
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }).catch(err => {
                setLoading(false);
            })
        }
    }

    return (
        <form className="bg-white ml-3 mr-6 rounded-md mt-4 shadow">
            <h2 className="py-4 px-6 opacity-80 border-b text-xl font-medium">Tìm kiếm lịch trình</h2>
            <div className="flex items-center mt-2">
                <p className="w-1/3 ml-2">Người đăng</p>
                <input type="text" name="username" value={search.username} onChange={HandleChangeSearch} className="border border-gray-400 px-2 py-1 rounded-md mx-2 focus:outline-none focus:border-none" style={{ width: "164px" }} />
            </div>
            <div className="flex items-center mt-2">
                <p className="w-1/3 ml-2">Phương tiện</p>
                <div className="w-2/3 flex items-center ml-4 rounded-lg py-1">
                    <div className={`inline-block relative font-thin text-base `} style={{ width: "164px" }}>
                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
                            name="transport" value={search.transport} onChange={HandleChangeSearch}>
                            <option value="" className="text-sm opacity-70">Phương tiện</option>
                            {elm}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <p className="w-1/3 ml-2">Thời gian đi</p>
                <div className="p-2 ml-2 rounded border border-gray-400">
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        dateFormat="Pp"
                        customInput={<ExampleCustomInput />}
                    />
                </div>

            </div>
            <div className="flex items-center mt-3 mb-2">
                <p className="w-1/3 ml-2">Thời gian đến</p>
                <div className="p-2 ml-2 rounded border border-gray-400">
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        dateFormat="Pp"
                        customInput={<ExampleCustomInput />}
                    />
                </div>
            </div>
            <div className="flex py-1">
                <p className="w-1/3 ml-2">Điểm đi</p>
                <div className="w-2/3">
                    <FormPlace array={Place.map(rs => rs.name)} HandleChange={HandleChangePlace} name="fromCity" type="Tỉnh/Thành Phố" />
                    <FormPlace HandleChange={HandleChangePlace} array={search.fromCity !== '' && search.fromCity !== 'Tỉnh/Thành Phố' ? Place.find(rs => rs.name === search.fromCity).districts.map(a => a.name) : []} name="fromDistrict" width="w-44" type="Quận/Huyện" />
                </div>
            </div>
            <div className="flex py-1 border-b">
                <p className="w-1/3 ml-2">Điểm đến</p>
                <div className="w-2/3">
                    <FormPlace array={Place.map(rs => rs.name)} HandleChange={HandleChangePlace} name="toCity" type="Tỉnh/Thành Phố" />
                    <FormPlace HandleChange={HandleChangePlace} array={search.toCity !== '' && search.toCity !== 'Tỉnh/Thành Phố' ? Place.find(rs => rs.name === search.toCity).districts.map(a => a.name) : []} name="toDistrict" width="w-44" type="Quận/Huyện" />
                </div>
            </div>
            <div className="flex justify-center py-3">
                <button onClick={HandleSubmit} className="hover-1 flex items-center">
                    <span>Tìm kiếm</span>
                    {loading && (
                        <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-4 w-4 ml-3"></div>
                    )}
                </button>
            </div>
        </form>
    );
}

export default Search;