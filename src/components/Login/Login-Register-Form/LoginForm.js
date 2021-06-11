import React, { useEffect, useState } from "react";
import "./login-register.scss";
import { useHistory } from 'react-router-dom';
import * as Mess from "./../../../constants/Message";
import { onLogin, userLogin } from './../../../reducers/checkLogin';
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from 'axios';
import * as Config from '../../../constants/Config';
import {saveUserPass} from './../../../reducers/username-password'; 

function LoginForm(props) {

    const history = useHistory();

    const dispatch = useDispatch();

    const checkLogin = useSelector(state => state.CheckLogin);

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const [mess, setMess] = useState(Mess.LOGIN_FAIL_INFO);

    const [check, setCheck] = useState(true);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (checkLogin.isAuth) {
            history.push('/');
        }
    })

    const handleChangeLogin = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setLogin({
            ...login,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (login.username !== "" && login.password !== "") {
            try {
                const actionResult = await dispatch(userLogin({ username: login.username, password: login.password }));
                const currentUser = unwrapResult(actionResult);
                if (currentUser.status === 200) {
                    setCheck(true);
                    setLoading(false);
                    await dispatch(saveUserPass({username: login.username, password: login.password}));
                    await dispatch(onLogin(currentUser.data));
                    axios.get(`${Config.API_URL}/api/active/connect/${login.username}`, {
                        headers: {
                            'Authorization': `Bearer ${currentUser.data.accessToken}`
                        }
                    }).then(res => res);
                } else {
                    setLoading(false);
                    setMess(Mess.LOGIN_FAIL_INFO);
                    setCheck(false);
                }
            } catch (error) {
                setLoading(false);
                setMess(Mess.LOGIN_FAIL_INFO);
                setCheck(false);
                console.log(error);
            }

        } else if (login.username !== "" && login.password === "") {
            setMess(Mess.LOGIN_FAIL_PASS_NULL);
            setCheck(false);
            setLoading(false);
        } else if (login.username === "" && login.password !== "") {
            setMess(Mess.LOGIN_FAIL_EMAIL_NULL);
            setCheck(false);
            setLoading(false);
        } else {
            setMess(Mess.LOGIN_FAIL_INFO);
            setCheck(false);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-1/2">
            <div className="w-7/12">

                <div className="flex items-center">
                    <div className="bg-logo bg-no-repeat bg-cover w-32 h-32 cursor-pointer"></div>
                    <h1 className="px-3 text-xl font-medium">TRANSPER</h1>
                </div>
                <div className="pl-3 mt-20">
                    <h1 className="text-3xl font-semibold mb-1">Đăng nhập</h1>
                    <p className="opacity-50 font-medium">
                        Đăng nhập để tiếp tục với trang web
                    </p>
                </div>
                <form action="" method="post" className="pl-3 mt-14">
                    <div className="animate-fade-in-up-0 border-b border-gray-200 flex items-center justify-between rounded py-1 input">
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            className="pl-2 w-full mr-2 py-1"
                            name="username"
                            value={login.username}
                            onChange={handleChangeLogin}
                        />
                        <i className="fas fa-user opacity-50 mr-2"></i>
                    </div>
                    <div className="animate-fade-in-up-1 border-b border-gray-200 flex items-center justify-between rounded py-1 mt-4 input">
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="pl-2 w-full mr-2 py-1"
                            name="password"
                            value={login.password}
                            onChange={handleChangeLogin}
                        />
                        <i className="fas fa-lock opacity-50 mr-2"></i>
                    </div>
                    {!check && (
                        <p className="text-sm text-red-600 ml-1 mt-2 italic">{mess}</p>
                    )}
                    <div className="animate-fade-in-up-2 flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="duration-300 text-xl flex items-center cursor-pointer py-3 px-10 rounded login-register-btn text-white font-medium hover:opacity-70 transition duration-700"
                        >
                            <span>Đăng nhập</span>
                            {loading && (
                                <div className="duration-300 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 ml-3"></div>
                            )}
                        </button>
                        <p className="font-medium opacity-40 cursor-pointer hover:opacity-90 transition duration-700">
                            Quên mật khẩu
                        </p>
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                        <div className="cursor-pointer animate-fade-in-up-icon-1 mx-1 border border-blue-800 p-3 rounded-full bg-blue-800 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-800 transition duration-500">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-2 mx-1 border border-blue-400 p-3 rounded-full bg-blue-400 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-400 transition duration-500">
                            <i className="fab fa-twitter"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-3 mx-1   border border-red-600 p-3 rounded-full bg-red-600 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition duration-500">
                            <i className="fab fa-google-plus-g"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-4 mx-1 border border-blue-600 p-3 rounded-full bg-blue-600 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition duration-500">
                            <i className="fab fa-linkedin-in"></i>
                        </div>
                        <div className="cursor-pointer animate-fade-in-up-icon-5 mx-1 border border-red-700 p-3 rounded-full bg-red-700 h-10 w-10 flex items-center justify-center text-white hover:bg-white hover:text-red-700 transition duration-500">
                            <i className="fab fa-pinterest-p"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
