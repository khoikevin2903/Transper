import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeaderOtherProfile(props) {

    const {id, name} = props;

    useEffect(() => {
        document.title = name ? `${name} | Transper` : "";
    }, [name]);

    return (
        <div className="bg-white relative rounded-md">
            <div className="bg-bgProfile bg-no-repeat bg-cover h-64 w-full rounded-b-md relative">
            </div>
            <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-4 py-6 px-6">
            <ul className="flex items-center">
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/08.png" alt="" className="rounded" />
                    </li>
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/09.png" alt="" className="rounded" />
                    </li>
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/10.png" alt="" className="rounded" />
                    </li>
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/11.png" alt="" className="rounded" />
                    </li>
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/12.png" alt="" className="rounded" />
                    </li>
                    <li className="px-2 cursor-pointer">
                        <img src="https://templates.iqonic.design/socialv/html/images/icon/13.png" alt="" className="rounded" />
                    </li>
                </ul>
                <div className="text-2xl font-medium flex justify-center opacity-80">
                    <h2>{name}</h2>
                </div>
                <div>
                    <ul className="flex items-center justify-center opacity-80">
                        <li className="px-2">
                            <h6>Bài Đăng</h6>
                            <p className="flex justify-center opacity-75">690</p>
                        </li>
                        <li className="px-2">
                            <h6>Người theo dõi</h6>
                            <p className="flex justify-center opacity-75">206</p>
                        </li>
                        <li className="pl-2">
                            <h6>Đang theo dõi</h6>
                            <p className="flex justify-center opacity-75">100</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-end py-3 border-t border-gray-200 mx-8">
                <div className="flex items-center">
                    <Link to={`/chat/${id}`} className="text-white p-2 mx-2 bg-blue-500 flex items-center justify-center rounded-lg font-bold"
                    
                    >
                        <i className="fab fa-facebook-messenger pr-2"></i>
                        <p>Nhắn tin</p>
                    </Link>
                    <button className="text-black bg-gray-200 px-6 py-3 text-xs rounded-lg">
                        <i className="fas fa-ellipsis-h opacity-70"></i>
                    </button>
                </div>
            </div>
            <div className="absolute w-full flex justify-center items-center bottom-36">
                <div className="bg-avatabig bg-no-repeat bg-cover h-36 w-36 border-green-300 rounded-full"></div>
            </div>

        </div>
    );
}

export default HeaderOtherProfile;