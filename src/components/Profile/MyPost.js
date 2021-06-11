import React, { useEffect, useState } from 'react';

function MyPost(props) {

    const {arr} = props;
    
    const [listPost, setListPost] = useState([...arr]);

    useEffect(() => {
        setListPost([...arr])
    }, [arr])

    const timeSince = (date) => {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " năm";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " tháng";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " ngày";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " giờ";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " phút";
        }
        return Math.floor(seconds) + " giây";
    }

    const ShowListPost = (listPost) => {
        let result;
        if (listPost.length > 0) {
            result = listPost.map((item, index) => {
                const from = item.fromPlace.split('-');
                const to = item.toPlace.split('-');
                return (
                    <div className="mb-3 bg-white rounded-lg px-3 shadow mt-4" key={item.id}>
                        <div className="border-b">
                            <div className="flex items-center py-3">
                                <div className="bg-avataImage h-12 w-12 bg-cover rounded-full mr-6 cursor-pointer">
                                </div>
                                <div>
                                    <p className="font-bold">{`${item.infoUser.lastName} ${item.infoUser.firstName} `}<span className="font-normal">đã thêm lịch trình mới - Phương tiện : </span>{item.transport !== null ? item.transport : 'Xe máy'}</p>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <p>{timeSince(Date.parse(item.createAt))}</p>
                                        <p className="mx-1"> · </p>
                                        <i className="fas fa-globe-americas"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-3">{item.description}</p>

                        </div>
                        <div className="py-3 px-4 grid grid-flow-row grid-cols-3 grid-rows-4 gap-8">
                            <div className="flex items-center rounded-lg mr-4 text-xl opacity-70">
                                <i className="fas fa-plane-departure text-blue-400 mr-4 w-1/5"></i>
                                <p>Khởi hành</p>
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {from[0]}
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {from[1]}
                            </div>
                            <div className="flex items-center rounded-lg mr-4 text-xl opacity-70">
                                <i className="fas fa-plane-arrival text-blue-400 mr-4 w-1/5"></i>
                                <p>Kết thúc</p>
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {to[0]}
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {to[1]}
                            </div>
                            <div className="flex items-center rounded-lg mr-4 text-xl opacity-70">
                                <i className="fas fa-hourglass-end text-blue-400 mr-4 w-1/5"></i>
                                <p>Thời gian đi</p>
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {item.fromTime.substring(11, 16)}
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {item.fromTime.substring(0, 10)}
                            </div>
                            <div className="flex items-center rounded-lg mr-4 text-xl opacity-70">
                                <i className="fas fa-hourglass-start text-blue-400 mr-4 w-1/5"></i>
                                <p>Thời gian đến</p>
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {item.toTime.substring(11, 16)}
                            </div>
                            <div className="flex items-center shadow-md px-2 py-2 rounded-md">
                                {item.toTime.substring(0, 10)}
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return result;

    }
    return (
        <div className="mt-4">
            {ShowListPost(listPost)}
        </div>
    );
}

export default MyPost;