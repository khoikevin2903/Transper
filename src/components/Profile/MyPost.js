import React, { useEffect, useState } from 'react';
import './MyPost.scss';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FetchPost } from '../../reducers/fetchMyPost';
import swal from 'sweetalert';

function MyPost(props) {

    const dispatch = useDispatch();

    const name = useSelector(state => state.CheckLogin.current.username);

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const { arr } = props;

    const [listPost, setListPost] = useState([...arr]);

    const [option, setOption] = useState(-1);

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
    const deletePost = (item) => {
        setOption(-1);
        swal({
            title: "Xóa bài viết?",
            text: "Bạn có chắc chắn xóa bài viết này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(`https://chatchit69.herokuapp.com/api/travel/deactive/${item.id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    )
                        .then(async res => {
                            if (res.status === 200) {
                                await dispatch(FetchPost({ username: name, header: token }));
                                swal("Xóa bài viết thành công!", {
                                    icon: "success",
                                });
                            }
                        })
                }
            });
    }

    const showQuote = (num) => {
        if (num === option) {
            setOption(-1);
        }
        else {
            setOption(num);
        }
    }

    const ShowListPost = (listPost) => {
        let result;
        if (listPost.length > 0) {
            result = listPost.map((item, index) => {
                const from = item.fromPlace.split('-');
                const to = item.toPlace.split('-');
                return (
                    <div className="relative" key={index}>
                        {option === index && <div className="hover:opacity-80 rounded-md absolute cursor-pointer right-0 shadow py-2 px-4" style={{ zIndex: "999", top: "-25px", right: "13px", background: "#eee" }}
                            onClick={() => deletePost(item)}
                        >
                            <div className="h-full w-full quote shadow-2xl flex items-center justify-center text-gray-600">Xóa Bài</div>
                        </div>}
                        <div className="mb-3 bg-white rounded-lg px-3 shadow mt-4 relative">
                            <div className="border-b w-full">
                                <div className="flex items-center py-3 w-full justify-between px-3">
                                    <div className="flex items-center">
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
                                    <div className="">
                                        <div className="p-2 duration-300 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center">
                                            <i className="opacity-50 fas fa-ellipsis-h" onClick={() => showQuote(index)}>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <p className="mb-3 px-3">{item.description}</p>

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
                                    <i className="fas fa-hourglass-start text-blue-400 mr-2 w-1/5"></i>
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