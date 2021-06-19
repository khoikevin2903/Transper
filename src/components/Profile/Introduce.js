import React from 'react';
import { useSelector } from 'react-redux';

function Introduce(props) {

    const User = useSelector(state => state.CheckLogin.current.userInfo);

    return (
        <div className="p-3 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold">Giới thiệu</h1>
            <div className="flex items-center mt-2">
                <i className="far fa-address-card text-gray-500"></i>
                <p className="px-2">Số điện thoại <span className="font-bold">{User.phoneNumber !== null ? User.phoneNumber : "Chưa cập nhật"}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-home text-gray-500"></i>
                <p className="px-2">Sống tại <span className="font-bold">{User.address !== null ? User.address : "Chưa cập nhật"}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-birthday-cake text-gray-500"></i>
                <p className="px-2">Ngày sinh <span className="font-bold">{User.dob !== null ? User.dob.substring(0,10) : "Chưa cập nhật"}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-venus-mars text-gray-500"></i>
                <p className="px-2">Giới tính <span className="font-bold">{User.gender !== null ? ( User.gender === true ? 'Nam' : 'Nữ' ) : "Chưa cập nhật" }</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-sort-numeric-up-alt text-gray-500"></i>
                <p className="px-2">Tuổi <span className="font-bold">{User.age !== null ? User.age : "Chưa cập nhật"}</span></p>
            </div>
        </div>
    );
}

export default Introduce;