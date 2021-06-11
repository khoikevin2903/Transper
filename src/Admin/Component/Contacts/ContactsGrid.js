import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import LeftList from '../../../components/LeftList/LeftList';
import RightListFriend from "../../../components/RightListFriend/RightListFriend";
import { Link } from 'react-router-dom';
import Classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Config from '../../../constants/Config';
import {fetchUser} from '../../../reducers/FetchAllUser';
import { useAlert } from "react-alert";

function ContactsGrid(props) {

    const alert = useAlert();

    const dispatch = useDispatch();

    const User = useSelector(state =>state.CheckLogin);

    const SortArr = (array) => {
        return array.sort(function (a, b) {
            return a.id - b.id;
        })
    }

    let ListUser = useSelector(state => state.FetchAllUser);
    
    ListUser = SortArr([...ListUser]);
    const [page, setPage] = useState({
        _limit: 10,
        page: 1
    });

    const HandleChangePage = (num) => {
        setPage({ ...page, page: num })
    }

    const Rating = (num,page) => {
        let result = [];
        num =  (Math.random() * 3) + 2;
        const newNum = Math.round(num);
        for (let i = 1; i <= 5; i++) {
            if (i <= num) {
                result.push(<i className="fas fa-star" key={Math.random() * 1000}></i>)
            }
        }
        if (num < newNum) {
            result.push(<i className="fas fa-star-half-alt" key={Math.random() * 1000}></i>)
        }
        for (let i = newNum; i < 5; i++) {
            result.push(<i className="far fa-star" key={Math.random() * 1000}></i>)
        }
        return result;
    }

    const HandleBlock = (item) => {
        axios.get(`${Config.API_URL}/api/users/block/${item.id}`, {
            headers: {
                'Authorization': `Bearer ${User.current.accessToken}`
            }}).then(res => {
                if(res.status === 200){
                    if(item.block === true){
                        alert.success('Mở khóa người dùng thành công !');
                    } else alert.error('Khóa người dùng thành công !');
                    dispatch(fetchUser(User.current.accessToken));
                    ListUser = SortArr([...ListUser]);
                }
                else {
                    alert('Chức năng xảy ra lỗi !')
                }
            })
    }

    const fetchListWithPage = (list) => {
        var result = null;
        const newList = list.filter((elm, index) => index >= page._limit * page.page - 10 && index < page._limit * page.page)
        result = newList.map((item, index) => {
            return (
                <tr className="text-sm border-b border-gray-200" key={index}>
                    <td className="pl-3 py-4">{item.id}</td>
                    <td>{`${item.lastName} ${item.firstName}`}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td className="pl-4">
                        <div style={{ color: '#bcd809' }} className="">
                            {Rating(item.avgRating, Math.random() * 10)}
                        </div>
                    </td>
                    <td className="flex h-full items-center justify-center">{item.numberOfPost}</td>
                    <td>
                        <Link title="Trang cá nhân" to={`/profile/${item.username}`}>
                            <i className="far fa-user-circle" alt="aaa"></i>
                        </Link>
                        <i className="far fa-trash-alt px-2 cursor-pointer" title="Xóa tài khoản"></i>
                        {item.blocked === true ? <i className="fas fa-lock-open px-2 cursor-pointer" title="Mở khóa tài khoản" onClick={() => HandleBlock({block: item.blocked, id: item.id})}></i> :
                            <i className="fas fa-lock px-2 cursor-pointer" title="Khóa tài khoản" onClick={() => HandleBlock({block: item.blocked, id: item.id})}></i>
                        }
                    </td>
                </tr>
            )
        })
        return result;
    }

    return (
        <div className="w-full relative">
            <div className="shadow header fixed w-full bg-white">
                <Header />
            </div>
            <div className="w-full h-screen flex bg-gray-100 relative pt-20 justify-center pl-6 pr-4">
                <div className="fixed left-0 w-1/6">
                    <LeftList />
                </div>
                <div className="w-4/6 px-4 pt-4 pb-8 h-full">
                    <h1 className="text-xl font-medium py-2">Danh sách người dùng</h1>
                    <div className="py-2">
                        <div className="p-4 bg-white rounded w-full h-full flex flex-col justify-between">
                            <table className="w-full h-full">
                                <thead>
                                    <tr className="bg-gray-200 opacity-70 rounded">
                                        <th className="w-1/12 text-left mr-4 py-3 pl-3">#</th>
                                        <th className="w-1/6 text-left">Họ và tên</th>
                                        <th className="w-1/6 text-left">Username</th>
                                        <th className="w-1/6 text-left">Email</th>
                                        <th className="w-1/6 text-left pl-4">Đánh giá</th>
                                        <th className="w-1/12 text-left">Bài đăng</th>
                                        <th className="w-1/6 text-left">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchListWithPage(ListUser)}
                                </tbody>
                            </table>
                            <div className=" flex justify-center pt-2 w-full ">
                                <ul className="flex items-center">
                                    <li className={Classnames(
                                        'text-xs h-8 w-8 flex items-center justify-center mx-2 text-blue-300 rounded-full cursor-pointer',
                                        {
                                            'text-blue-500 hover:bg-gray-200': page.page !== 1
                                        }
                                    )} onClick={() => HandleChangePage(page.page !== 1 ? page.page - 1 : page.page)}>
                                        <i className="fas fa-chevron-left"></i>
                                    </li>
                                    <li className={Classnames(
                                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                                        {
                                            'text-white opacity-80 bg-blue-500': page.page === 1
                                        },
                                        {
                                            'hover:bg-gray-200 text-gray-600': page.page !== 1
                                        }
                                    )} onClick={() => HandleChangePage(1)}>1</li>
                                    <li className={Classnames(
                                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                                        {
                                            'text-white opacity-80 bg-blue-500': page.page === 2
                                        },
                                        {
                                            'hover:bg-gray-200 text-gray-600': page.page !== 2
                                        }
                                    )} onClick={() => HandleChangePage(2)}>2</li>
                                    <li className={Classnames(
                                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                                        {
                                            'text-white opacity-80 bg-blue-500': page.page === 3
                                        },
                                        {
                                            'hover:bg-gray-200 text-gray-600': page.page !== 3
                                        }
                                    )} onClick={() => HandleChangePage(3)}>3</li>
                                    <li className={Classnames(
                                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                                        {
                                            'text-white opacity-80 bg-blue-500': page.page === 4
                                        },
                                        {
                                            'hover:bg-gray-200 text-gray-600': page.page !== 4
                                        }
                                    )} onClick={() => HandleChangePage(4)}>4</li>
                                    <li className={Classnames(
                                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                                        {
                                            'text-white opacity-80 bg-blue-500': page.page === 5
                                        },
                                        {
                                            'hover:bg-gray-200 text-gray-600': page.page !== 5
                                        }
                                    )} onClick={() => HandleChangePage(5)}>5</li>
                                    <li className={Classnames(
                                        'text-xs h-8 w-8 mx-1 flex items-center justify-center text-blue-300 rounded-full cursor-pointer',
                                        {
                                            'text-blue-500 hover:bg-gray-200': page.page !== 5
                                        }
                                    )} onClick={() => HandleChangePage(page.page !== 5 ? page.page + 1 : page.page)}>
                                        <i className="fas fa-chevron-right"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="w-1/6 w3-animate-right fixed right-0"
                    style={{ animationDuration: "0.7s" }}
                >
                    <RightListFriend />
                </div>
            </div>
        </div>
    );
}

export default ContactsGrid;
