import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogin, onRegister } from '../../../reducers/login-register';
import ClassNames from 'classnames';
function BgLogin(props) {
    const dispatch = useDispatch();
    const active = useSelector(state => state.LoginRegister);
    
    return (
        <div className="w-1/2 h-screen relative">
            <div className={ClassNames(" w-full h-screen bg-no-repeat bg-cover",
                {
                    "bg-registerImage" : active === 1
                },
                {
                    "bg-loginImage" : active === 0
                }
        )}>
            </div>
            <div className="h-full w-full bg-black opacity-50 flex absolute top-0 left-0 z-40 flex justify-center items-center">
            </div>
            <div className="text-white absolute top-0 left-0 z-50 flex items-center justify-center h-full w-full">
                <div className="w-7/12 break-words">
                    <h1 className="font-bold text-2xl mb-10">Chào Mừng Bạn Đã Đến Với Transper</h1>
                    <p>Như là đã chứng kiến tất cả một đời sống hối hả.
                    Nhà tôi gần phố trong một lần đó.
                    Do là may mắn,
                    Cho tôi tìm được người bạn đồng hành dù mong manh nhưng cả hai lột tả cùng một tầng số.
                            </p>
                    <div className="flex items-center divide-x divide-white justify-start mt-8 ">
                        <div className={ClassNames(
                            "pr-4 text-xl",
                            {
                                'text-yellow-500': active === 0
                            }
                        )}
                            onClick={() => dispatch(onLogin())}
                        >
                            <Link to="/login">
                                Đăng Nhập
                                </Link>
                        </div>
                        <div className={ClassNames(
                            "pl-4 text-xl",
                            {
                                'text-yellow-500': active === 1
                            }
                        )}
                            onClick={() => dispatch(onRegister())}
                        >
                            <Link to="/register">
                                Đăng Ký
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BgLogin;