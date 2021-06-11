import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../reducers/changePassword';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAlert } from "react-alert";

function ChangePassword(props) {

    const alert = useAlert();

    const dispatch = useDispatch();

    const [check, setCheck] = useState();

    const [loading, setLoading] = useState(false);

    const [mess, setMess] = useState();

    const info = useSelector(state => state.CheckLogin);

    const [changePass, setChangePass] = useState({
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
    });

    const HandleChangePass = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setChangePass({ ...changePass, [name]: value });
    };

    const HandleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (changePass.oldPassword === '' || changePass.newPassword === '' || changePass.verifyPassword === '') {
            setLoading(false);
            setCheck(false);
            setMess('Không được để trống!!!');
        }
        else if (changePass.newPassword !== changePass.verifyPassword) {
            setLoading(false);
            setCheck(false);
            setMess('Xác nhận mật khẩu không đúng !!!');
        } else {
            try {
                const actionResult = await dispatch(changePassword({
                    username: info.current.username,
                    oldPassword: changePass.oldPassword,
                    newPassword: changePass.newPassword

                }));
                const currentResult = unwrapResult(actionResult);
                if (currentResult.status === 200) {
                    setLoading(false);
                    alert.success('Đổi mật khẩu thành công !');
                    setChangePass({
                        oldPassword: "",
                        newPassword: "",
                        verifyPassword: ""
                    });
                } else {
                    setLoading(false);
                    alert.error("Đổi mật khẩu thất bại");
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className="bg-white rounded mt-4 shadow duration-300">
            <div className="">
                <h1 className=" text-2xl py-4 px-6 opacity-70 font-normal border-b border-gray-200">Đổi mật khẩu</h1>
                <form className="px-4 py-4">
                    <div className="mb-3">
                        <div className="flex items-center justify-between">
                            <p className="py-2 font-light opacity-75">Mật khẩu hiện tại</p>
                            <p className="text-blue-300 cursor-pointer hover:text-blue-500 duration-300">Quên mật khẩu</p>
                        </div>
                        <input type="password" value={changePass.oldPassword} onChange={HandleChangePass} name="oldPassword" className="w-full rounded-lg border border-gray-200 py-3 text-sm px-3 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-3">
                        <div className="flex items-center justify-between">
                            <p className="py-2 font-light opacity-75">Mật khẩu mới</p>
                        </div>
                        <input type="password" value={changePass.newPassword} onChange={HandleChangePass} name="newPassword" className="w-full rounded-lg border border-gray-200 py-3 text-sm px-3 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-2">
                        <div className="flex items-center justify-between">
                            <p className="py-2 font-light opacity-75">Xác nhận mật khẩu</p>
                        </div>
                        <input type="password" value={changePass.verifyPassword} onChange={HandleChangePass} name="verifyPassword" className="w-full rounded-lg border border-gray-200 py-3 text-sm px-3 focus:outline-none focus:border-blue-400" />
                    </div>
                    {check === false && <p className="py-1 text-red-600">{mess}</p>}
                    <div className="flex items-center mt-2">
                        <button type="submit" className="flex items-center justify-center mr-3 py-2 px-4 rounded-lg bg-blue-400 text-white cursor-pointer opacity-80 hover:opacity-100 duration-300"
                            onClick={HandleSubmit}
                        >
                           <span>Thay đổi</span>
                           {loading && (
                                <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 ml-3"></div>
                            )}
                        </button>
                        <button type="reset" className="mr-3 py-2 px-4 rounded-lg bg-gray-100 text-yellow-500 cursor-pointer opacity-80 hover:opacity-100 duration-300">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;