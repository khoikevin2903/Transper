import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { offModal } from '../../../../../reducers/showModal';
import FormStartPlace from '../../../../FormInfoPlace/FormStartPlace';
import FormEndPlace from '../../../../FormInfoPlace/FormEndPlace';
import FormDatePicker from './FormDatePicker';
import FormTimePicker from './FormTimePicker copy';
import moment from 'moment';
import axios from 'axios';
import * as Config from '../../../../../constants/Config';
import { defaultPlace } from '../../../../../reducers/infoPlace';
import { defaultPlaceName } from '../../../../../reducers/infoPlaceName';
import Transport from '../../../../../constants/Transport';
import { FetchList } from '../../../../../reducers/fetchListPost';

function FormCreate(props) {

    const dispatch = useDispatch();

    const User = useSelector(user => user.CheckLogin);

    const Place = useSelector(state => state.Place);

    const InfoPlace = useSelector(state => state.InfoPlace);

    const InfoPlaceName = useSelector(state => state.InfoPlaceName);

    const districtStart = useSelector(state => state.DisTrictsStart);

    const districtEnd = useSelector(state => state.DisTrictsEnd);

    const [loading, setLoading] = useState(false);

    const [check, setCheck] = useState(false);

    const [content, setContent] = useState("");

    const [transport, setTransport] = useState('Ô tô');

    const HandleChangeTransport = (e) => {
        setTransport(e.target.value);
    }

    const elm = Transport ? Transport.map((arr, index) => {
        return <option value={arr} key={index} className="text-sm opacity-70">{arr}</option>
    }) : "";


    const CreateTravel = (e) => {
        setLoading(true);
        e.preventDefault();
        if (InfoPlaceName.startCity !== null && InfoPlaceName.startDistrict !== null
            && InfoPlaceName.endCity !== null && InfoPlaceName.endDistrict !== null) {
            axios.post(`${Config.API_URL}/api/travel/new`, {
                creatorId: User.current.id,
                description: content,
                fromPlace: `${InfoPlaceName.startDistrict} - ${InfoPlaceName.startCity}`,
                toPlace: `${InfoPlaceName.endDistrict} - ${InfoPlaceName.endCity}`,
                fromTime: InfoPlaceName.startCalendar !== null && InfoPlaceName.startTime !== null ?
                    `${InfoPlaceName.startCalendar}${InfoPlaceName.startTime}` : `${moment(new Date()).format().substring(0, 11)}${moment(new Date()).format().substring(11, 19)}`,
                toTime: InfoPlaceName.endCalendar !== null && InfoPlaceName.endTime !== null ?
                    `${InfoPlaceName.endCalendar}${InfoPlaceName.endTime}` : `${moment(new Date()).format().substring(0, 11)}${moment(new Date()).format().substring(11, 19)}`,
                transport: transport
            }, {
                headers: {
                    'Authorization': `Bearer ${User.current.accessToken}`
                }
            }).then(res => {
                if (res.status === 200) {
                    dispatch(FetchList(User.current.accessToken));
                    setLoading(false);
                    dispatch(offModal());
                } else {
                    setCheck(true);
                    setLoading(false);
                }
            }).catch(err => {
                setCheck(true);
                setLoading(false);
            })
        } else {
            setCheck(true);
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center px-3 ml-6 ">
            <div className=" w-2/3">
                <div className="w-2/3 animate-fade-in-down">
                    <div className="bg-white rounded-md">
                        <div className="py-4 px-6 border-b flex items-center justify-between">
                            <h2 className="opacity-80 text-blue-500 text-2xl">Tạo Lịch Trình</h2>
                            <div className="text-white bg-gray-400 h-8 w-10 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-500 duration-500"
                                onClick={() => {
                                    dispatch(offModal());
                                    dispatch(defaultPlace());
                                    dispatch(defaultPlaceName());

                                }}
                            >
                                <i className="fas fa-times"></i>
                            </div>
                        </div>
                        <form className="">
                            <div className="px-4">
                                <div className=" flex items-center border-b py-3">
                                    <div className="bg-avataImage h-16 w-16 bg-cover rounded-full mr-6"></div>
                                    <input onChange={(e) => {
                                        setContent(e.target.value)
                                    }} type="text" placeholder="Thông tin chi tiết ..." className="text-sm font-normal px-3 focus:outline-none focus:border-none" />
                                </div>
                            </div>
                            <div className="py-3 px-4 grid grid-flow-row grid-cols-3 grid-rows-4 gap-4">
                                <div className="flex items-center rounded-lg text-xl opacity-70">
                                    <i className="fas fa-plane-departure text-blue-400 ml-4 mr-4 w-1/5"></i>
                                    <p >Khởi hành</p>
                                </div>
                                <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                    <FormStartPlace array={Place.map(rs => rs.name)} name="startCity" width="w-52" type="Tỉnh/Thành Phố" />
                                </div>
                                <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                    <FormStartPlace array={InfoPlace.startCity !== null ? districtStart.map(rs => rs.name) : null} name="startDistrict" width="w-52" type="Quận/Huyện" />
                                </div>
                                <div className="flex items-center rounded-lg text-xl opacity-70">
                                    <i className="fas fa-plane-arrival text-blue-400 ml-4 mr-4 w-1/5"></i>
                                    <p >Kết thúc</p>
                                </div>
                                <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                    <FormEndPlace array={Place.map(rs => rs.name)} name="endCity" width="w-52" type="Tỉnh/Thành Phố" />
                                </div>
                                <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                    <FormEndPlace array={InfoPlace.endCity !== null ? districtEnd.map(rs => rs.name) : null} name="endDistrict" width="w-52" type="Quận/Huyện" />
                                </div>
                                <div className="flex items-center rounded-lg text-xl opacity-70">
                                    <i className="fas fa-hourglass-end text-blue-400 ml-4 mr-4 w-1/5"></i>
                                    <p >Thời gian đi</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FormDatePicker name="startCalendar" />
                                </div>
                                <div className="flex items-center justify-center">
                                    <FormTimePicker name="startTime" />
                                </div>
                                <div className="flex items-center rounded-lg text-xl opacity-70">
                                    <i className="fas fa-hourglass-start text-blue-400 ml-4 mr-4 w-1/5"></i>
                                    <p >Thời gian đến</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FormDatePicker name="endCalendar" />
                                </div>
                                <div className="flex items-center justify-center">
                                    <FormTimePicker name="endTime" />
                                </div>

                            </div>
                            {check && (
                                <p className="text-sm text-red-600 ml-1 mt-1 mb-2 pl-12 italic">Vui lòng kiểm tra lại thông tin cần đăng</p>
                            )}
                            <div className="px-2 border-t w-full">
                                <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-2">
                                    <div className="flex items-center rounded-lg text-xl opacity-70">
                                        <i className="fas fa-car text-blue-400 ml-4 mr-4 w-1/5"></i>
                                        <p >Phương tiện</p>
                                    </div>
                                    <div className="flex items-center justify-center rounded-lg my-3 px-2 shadow">
                                        <div className={`inline-block relative font-thin text-base w-52`}>
                                            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                                                name="transport" value={transport} onChange={HandleChangeTransport}>
                                                {elm}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center justify-center cursor-pointer m-4 transition duration-500 transform py-3 px-10 bg-blue-500 text-white border-2 border-blue-600 rounded-lg text-xl"
                                        type="submit"
                                        onClick={CreateTravel}
                                    >
                                        <span>Tạo</span>
                                        {loading && (
                                            <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-4 w-4 ml-3"></div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div >
    );
}

export default FormCreate;