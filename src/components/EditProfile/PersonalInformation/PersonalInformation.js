import React, { useEffect, useState } from 'react';
import FormDatePicker from './FormDatePicker';
import { changeInfo } from '../../../reducers/changeInformation';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useAlert } from "react-alert";
import {onLogout} from '../../../reducers/checkLogin';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function PersonalInformation(props) {

    const history = useHistory();

    const alert = useAlert();

    const dispatch = useDispatch();

    const User = useSelector(state => state.CheckLogin);

    const [info, setInfo] = useState({...User.current.userInfo})

    useEffect(() => {
            setInfo({...User.current.userInfo})
    }, [])

    const [loading, setLoading] = useState(false);

    const HandleChangeInfo = (e) => {
        const target = e.target;
        let name = target.name;
        let value = target.value;
        if (name === 'gender') {
            if (value === 'male') value = true;
            else value = false
        }
        setInfo({ ...info, [name]: value });
    }

    const HandleChangeDate = (date) => {
        setInfo({ ...info, dob: date });
    }

    const HandleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            setInfo({
                id: User.current.id,
                firstName: info.firstName,
                lastName: info.lastName,
                idCardNumber: info.idCardNumber,
                address: info.address,
                phoneNumber: info.phoneNumber,
                age: info.age,
                gender: info.gender,
                dob: info.dob,
            })
            const actionResult = await dispatch(changeInfo({
                id: User.current.id,
                firstName: info.firstName,
                lastName: info.lastName,
                idCardNumber: info.idCardNumber,
                address: info.address,
                phoneNumber: info.phoneNumber,
                age: Number(info.age),
                gender: info.gender,
                dob:info.dob !== null ? moment(info.dob).format().substring(0,29) : new Date(),
                header: User.current.accessToken
            }));
            const currentResult = unwrapResult(actionResult);
            if (currentResult.status === 200) {
                setLoading(false);
                // alert.success('Thay ?????i th??ng tin th??nh c??ng !');
                // if(window.confirm('B???n c?? mu???n ????ng nh???p l???i ????? c???p nh???t th??ng tin ?'))
                swal({
                    title: "C???p nh???t th??ng tin th??nh c??ng?",
                    text: "B???n c?? mu???n ????ng nh???p l???i ????? c???p nh???t th??ng tin!",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willLogout) => {
                    if (willLogout) {
                        dispatch(onLogout());
                    } else {
                      history.push('/')
                    }
                  });
            } else {
                setLoading(false);
                alert.error("Thay ?????i th??ng tin th???t b???i!!!");
            }
        } catch (error) {
            setLoading(false);
            alert.error("Thay ?????i th??ng tin th???t b???i!!!");
        }
    }

    return (
        <div className="bg-white rounded mt-4 shadow duration-300 pb-4">
            <div className="">
                <h1 className=" text-2xl py-4 px-6 opacity-70 font-normal border-b border-gray-200">Th??ng Tin C?? Nh??n</h1>
                <div className="bg-white p-2">
                    <div className="p-2 relative">
                        <img src={require('../../../image/avatabig.png').default} alt=""
                            className="rounded-full h-40 w-40 bg-cover" />
                        <i className="fas fa-pencil-alt absolute text-white text-sm bg-blue-400 p-2 rounded-full left-32 bottom-4"></i>
                    </div>
                </div>
                <form className="">
                    <div className="grid grid-flow-row grid-cols-2 auto-rows-auto gap-1">
                        <p className="flex items-center mx-3">T??n:</p>
                        <p className="flex items-center mx-3">H???:</p>
                        <input type="text" name="firstName" value={info.firstName ? info.firstName : ""} onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <input type="text" name="lastName" value={info.lastName ? info.lastName : ""} onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <p className="flex items-center mx-3">Ch???ng minh nh??n d??n:</p>
                        <p className="flex items-center mx-3">Th??nh ph???:</p>
                        <input type="text" name="idCardNumber" value={info.idCardNumber ? info.idCardNumber : ""} onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <input type="text" name="address" value={info.address? info.address : "" } onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <p className="flex items-center mx-3">S??? ??i???n tho???i:</p>
                        <p className="flex items-center mx-3">Tu???i:</p>
                        <input type="text" name="phoneNumber" value={info.phoneNumber ? info.phoneNumber: ""} onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <input type="number" name="age" value={info.age ? info.age : ""} onChange={HandleChangeInfo} className=" flex items-center mx-3 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-none" />
                        <p className="flex items-center mx-3">Gi???i t??nh:</p>
                        <p className="flex items-center mx-3">Ng??y sinh:</p>
                        <div className="flex items-center mx-3">
                            <label className="inline-flex items-center mr-6">
                                <input type="radio" className="form-radio h-5 w-5 text-blue-600" name="gender" id="male" checked={info.gender === true} value="male" onChange={HandleChangeInfo} />
                                <span className="ml-2 text-gray-700">Nam</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio h-5 w-5 text-blue-600" name="gender" id="female" checked={info.gender === false} value="female" onChange={HandleChangeInfo} />
                                <span className="ml-2 text-gray-700">N???</span>
                            </label>
                        </div>
                        <FormDatePicker HandleChange={HandleChangeDate} dob={info.dob} />
                    </div>
                    <div className="flex items-center mt-2 ml-3">
                        <button type="submit" className="flex items-center justify-center mr-3 py-2 px-4 rounded-lg bg-blue-400 text-white cursor-pointer opacity-80 hover:opacity-100 duration-300"
                            onClick={HandleSubmit}
                        >
                            <span>Thay ?????i</span>
                            {loading && (
                                <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 ml-3"></div>
                            )}
                        </button>
                        <button type="reset" className="mr-3 py-2 px-4 rounded-lg bg-gray-100 text-yellow-500 cursor-pointer opacity-80 hover:opacity-100 duration-300">
                            H???y
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalInformation;