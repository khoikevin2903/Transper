import React from 'react';

function Introduce(props) {

    const {arr} = props;

    return (
        <div className="p-3 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold">Giới thiệu</h1>
            <div className="flex items-center mt-2">
                <i className="far fa-address-card text-gray-500"></i>
                <p className="px-2">Số điện thoại: <span className="font-bold">{arr.phoneNumber}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-home text-gray-500"></i>
                <p className="px-2">Sống tại <span className="font-bold">{arr.address}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-birthday-cake text-gray-500"></i>
                <p className="px-2">Ngày sinh <span className="font-bold">{(Object.keys(arr).length === 0 && arr.constructor === Object) ? "": arr.dob.substring(0,10)}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-venus-mars text-gray-500"></i>
                <p className="px-2">Giới tính <span className="font-bold">{arr.gender === true ? 'Nam' : 'Nữ'}</span></p>
            </div>
            <div className="flex items-center mt-2">
                <i className="fas fa-sort-numeric-up-alt text-gray-500"></i>
                <p className="px-2">Tuổi <span className="font-bold">{arr.age}</span></p>
            </div>
        </div>
    );
}

export default Introduce;