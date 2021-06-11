import React, { useState } from 'react';
import Header from "../Header/Header";
import LeftList from "../LeftList/LeftList";
import RightListFriend from "../RightListFriend/RightListFriend";
import ClassNames from "classnames";
import PersonalInformation from './PersonalInformation/PersonalInformation';
import ChangePassword from './ChangePassword/ChangePassword';

function EditProfile(props) {

    const [option, setOption] = useState(0);

    const HandleChangeOption = (opt) => {
        setOption(opt);
    }

    return <div className="w-full relative">
        <div className="shadow header fixed w-full bg-white">
            <Header />
        </div>
        <div className="w-full h-screen flex bg-gray-100 relative pt-20 justify-center pl-6 pr-4">
            <div className="fixed left-0 w-1/6">
                <LeftList />
            </div>
            <div className="w-4/6 px-4 pt-4 pb-8 h-full">
                <ul className="shadow bg-white w-full flex items-center text-gray-500 text-lg grid grid-flow-row grid-cols-4 grid-rows-1 rounded">
                <li className={ClassNames(`${option !== 0 ? 'hover:text-blue-300' : ''} duration-300 flex items-center justify-center cursor-pointer py-6`,
                        {
                            "bg-blue-400 text-white opacity-90": option === 0
                        }
                    )} style={{ borderRadius: "4px 0 0px 4px" }}
                        onClick={() => HandleChangeOption(0)}
                    >Thông Tin Cá Nhân</li>
                    <li className={ClassNames(`${option !== 1 ? 'hover:text-blue-300' : ''} duration-300 flex items-center justify-center cursor-pointer py-6`,
                        {
                            "bg-blue-400 text-white opacity-90": option === 1
                        }
                    )}
                        onClick={() => HandleChangeOption(1)}
                    >Đổi Mật Khẩu</li>
                    <li className={ClassNames(`${option !== 2 ? 'hover:text-blue-300' : ''} duration-300 flex items-center justify-center cursor-pointer py-6`,
                        {
                            "bg-blue-400 text-white opacity-90": option === 2
                        }
                    )}
                        onClick={() => HandleChangeOption(2)}
                    >Email and SMS</li>
                    <li className={ClassNames(`${option !== 3 ? 'hover:text-blue-300' : ''} duration-300 flex items-center justify-center cursor-pointer py-6`,
                        {
                            "bg-blue-400 text-white opacity-90": option === 3
                        }
                    )} style={{ borderRadius: "0 4px 4px 0px" }}
                        onClick={() => HandleChangeOption(3)}
                    > Manage Contact</li>
                </ul>
                {option === 0 ? <PersonalInformation /> : <ChangePassword />}
            </div>
            <div className="w-1/6 w3-animate-right fixed right-0" style={{ animationDuration: "0.7s" }}>
                <RightListFriend />
            </div>

        </div>
    </div>
}

export default EditProfile;