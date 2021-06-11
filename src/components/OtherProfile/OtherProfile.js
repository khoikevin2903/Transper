import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import LeftList from "../LeftList/LeftList";
import RightListFriend from "../RightListFriend/RightListFriend";
import HeaderOtherProfile from './HeaderOtherProfile';
import axios from 'axios';
import * as Config from '../../constants/Config';
import { useDispatch, useSelector } from 'react-redux';
import Introduce from './Introduce';
import MyPost from './MyPost';
import Rating from './Rating';
import { FetchPost } from '../../reducers/fetchMyPost';

function OtherProfile(props) {

    const {name} = props;

    const [infoUser, setInfoUser] = useState({});

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const dispatch = useDispatch();

    const Post = useSelector(state => state.MyPost);

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${Config.API_URL}/api/user-information/uname/${name}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setInfoUser(res.data));
            await dispatch(FetchPost({ username: name, header: token }));
        }
        fetchData();
    }, [token, name]);

    return <div className="w-full relative">
        <div className="shadow header fixed w-full bg-white">
            <Header />
        </div>
        <div className="w-full h-screen flex bg-gray-100 relative pt-20 justify-center pl-6 pr-4">
            <div className="fixed left-0 w-1/6">
                <LeftList />
            </div>
            <div className="w-4/6 px-4 pb-8 h-full bg-gray-100">
                <HeaderOtherProfile id={infoUser ? infoUser.id : ""} name={infoUser ? `${infoUser.lastName} ${infoUser.firstName}` : ""} />
                <div className="w-full flex pt-2">
                    <div className="w-1/3 mr-4 mt-4">
                        <Introduce arr={infoUser} />
                        <Rating />
                    </div>
                    <div className="w-2/3">
                        <MyPost arr={Post} />
                    </div>
                </div>
            </div>
            <div className="w-1/6 w3-animate-right fixed right-0" style={{ animationDuration: "0.7s" }}>
                <RightListFriend />
            </div>

        </div>
    </div>
}

export default OtherProfile;