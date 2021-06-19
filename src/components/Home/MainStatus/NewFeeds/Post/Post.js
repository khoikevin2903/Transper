import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FetchList } from '../../../../../reducers/fetchListPost';
import swal from 'sweetalert';
import './Post.scss';

function Post(props) {

    const dispatch = useDispatch();

    const [check, setCheck] = useState(0)

    const [option, setOption] = useState(-1);

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const id = useSelector(state => state.CheckLogin.current.id);

    const rolesLength = useSelector(state => state.CheckLogin.current.roles.length);

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
        if (seconds < 0) return 'Vừa đăng';
        return Math.floor(seconds) + " giây";
    }

    const ListPost = useSelector(state => state.FetchListPost);

    const showQuote = (num) => {
        if (num === option) {
            setOption(-1);
        }
        else {
            setOption(num);
        }
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
                                await dispatch(FetchList(token));
                                swal("Xóa bài viết thành công!", {
                                    icon: "success",
                                });
                            }
                        })
                }
            });
    }

    const ShowListPost = (listPost) => {
        let result;
        if (listPost.length > 0) {
            result = listPost.map((item, index) => {
                const from = item.fromPlace.split('-');
                const to = item.toPlace.split('-');
                return (
                    <div className="relative relative" key={index}>
                        {option === index && <div className="hover:opacity-80 rounded-md absolute cursor-pointer right-0 shadow py-2 px-4" style={{ zIndex: "999", top: "-25px", right: " 2px", background: "#eee" }}
                            onClick={() => deletePost(item)}
                        >
                            <div className="h-full w-full quote shadow-2xl flex items-center justify-center text-gray-600">Xóa Bài</div>
                        </div>}
                        <div className="mb-3 bg-white rounded-lg px-3 shadow mt-4">
                            <div className="border-b">
                                <div className="flex items-center relative justify-between">
                                    <div className="flex items-center py-3 relative">
                                        <div className={`avatar h-12 w-12 bg-cover rounded-full mr-6 cursor-pointer ${item.creatorId === id ? 'bg-avataImage' : 'bg-avataImage2'}`}
                                            onClick={() => {
                                                if (check === index + 1) setCheck(0);
                                                else setCheck(index + 1)
                                            }} >
                                        </div>
                                        <div>
                                            <p className="font-bold">{`${item.infoUser.lastName} ${item.infoUser.firstName} `}<span className="font-normal"
                                            ><span>{`(${item.creatorUname})`}</span> đã thêm lịch trình mới - Phương tiện : </span>{item.transport !== null ? item.transport : 'Xe máy'}</p>
                                            <div className="text-xs text-gray-500 flex items-center">
                                                <p>{timeSince(Date.parse(item.createAt))}</p>
                                                <p className="mx-1"> · </p>
                                                <i className="fas fa-globe-americas"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {rolesLength > 1 && <div className="">
                                        <div className="p-2 duration-300 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center">
                                            <i className="opacity-50 fas fa-ellipsis-h" onClick={() => showQuote(index)}>
                                            </i>
                                        </div>
                                    </div>}
                                    {(index + 1 === check && id !== item.creatorId) && <div className="duration-500 shadow-md p-4 bg-white absolute rounded-md" style={{ left: "-130px", top: "-160px", width: "300px" }}>
                                        <div className="flex items-center ">
                                            <Link to={`/profile/${item.creatorUname}`} className="avatar bg-avataImage h-20 w-20 bg-cover rounded-full mr-6 cursor-pointer">
                                            </Link>
                                            <div>
                                                <p className="font-bold py-3 text-xl">{`${item.infoUser.lastName} ${item.infoUser.firstName}`}</p>
                                                <p className="opacity-75 text-sm">{`Thành Phố: ${item.infoUser.address}`}</p>
                                                <p className="opacity-75 text-sm">{`SĐT : ${item.infoUser.phoneNumber}`}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-2">
                                            <Link to={`/chat/${item.creatorId}`} className="rounded-md font-medium text-white bg-blue-500 py-2 px-10 flex items-center justify-center">
                                                <i className="fab fa-facebook-messenger pl-1 pr-3"></i>
                                                <p>Nhắn tin</p>
                                            </Link>
                                            <div className="rounded-md ml-2 opacity-75  px-4 py-3 bg-gray-200 flex items-center justify-center">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </div>
                                        </div>
                                    </div>}
                                    {(index + 1 === check && id === item.creatorId) && <div className="duration-500 shadow-md p-4 bg-white absolute rounded-md" style={{ left: "-130px", top: "-160px", width: "300px" }}>
                                        <div className="flex items-center ">
                                            <div className="avatar bg-avataImage h-20 w-20 bg-cover rounded-full mr-6 cursor-pointer">
                                            </div>
                                            <div>
                                                <p className="font-bold py-3 text-xl">{`${item.infoUser.lastName} ${item.infoUser.firstName}`}</p>
                                                <p className="opacity-75">{`Thành Phố: ${item.infoUser.address}`}</p>
                                                <p className="opacity-75">{`CMND : ${item.infoUser.idCardNumber}`}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-2 font-medium opacity-80">
                                            <Link className="p-2 bg-gray-200 rounded-md flex items-center justify-center" to="/edit">
                                                <i className="fas fa-pen pl-1 pr-3"></i>
                                                <p>Chỉnh sửa trang cá nhân</p>
                                            </Link>
                                        </div>
                                    </div>}
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
                    </div>
                )
            })
        }
        return result;
    }

    return (
        <div className="mt-4">
            {ShowListPost(ListPost)}
        </div>
    );
}

export default Post;