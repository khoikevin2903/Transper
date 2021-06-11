import React from 'react';
import { useDispatch } from 'react-redux';
import { onModal } from '../../../../../reducers/showModal';

function CreatePost(props) {

    const dispatch = useDispatch();
    return (
        <div className=" shadow">
            <h2 className="py-4 px-6 opacity-80 border-b">Tạo Lịch Trình</h2>
            <div className="" onClick={() => dispatch(onModal(1))}>
                <div className="px-4">
                    <div className=" flex items-center border-b py-3">
                        <div className="bg-avataImage h-16 w-16 bg-cover rounded-full mr-6"></div>
                        <input type="text" placeholder="Thông tin chi tiết ..." className="text-sm font-normal px-3 focus:outline-none focus:border-none" />
                    </div>
                </div>
                <div className="py-3 px-4 flex items-center">
                    <div className="flex items-center bg-gray-50 p-2 rounded-md mr-4">
                        <img src="https://iqonic.design/themes/socialv/html/images/small/07.png" alt="" className="" />
                        <p className="text-sm text-blue-400 ml-2">Ảnh/Video</p>
                    </div>
                    <div className="flex items-center bg-gray-50 p-2 rounded-md mr-4">
                        <img src="https://iqonic.design/themes/socialv/html/images/small/08.png" alt="" className="" />
                        <p className="text-sm text-blue-400 ml-2">Thêm Bạn Bè</p>
                    </div>
                    <div className="flex items-center bg-gray-50 p-2 rounded-md mr-4">
                        <img src="https://iqonic.design/themes/socialv/html/images/small/09.png" alt="" className="" />
                        <p className="text-sm text-blue-400 ml-2">Cảm xúc</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md">
                        <i className="fas fa-ellipsis-h opacity-40"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;