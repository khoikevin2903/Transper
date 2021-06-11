import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header/Header";
import LeftList from "../LeftList/LeftList";
import RightListFriend from "../RightListFriend/RightListFriend";
import MainStatus from "./MainStatus/MainStatus";
import FormCreate from "./MainStatus/NewFeeds/FormCreatePost/FormCreate";
import {FetchList} from '../../reducers/fetchListPost';
import {FetchChat} from '../../reducers/FetchListChat';
import {FetchChat2} from '../../reducers/FetchListChat2';

import './Home.scss';

function Home(props) {

    const dispatch = useDispatch();

    const token = useSelector(user => user.CheckLogin.current.accessToken);
    
    const id = useSelector(user => user.CheckLogin.current.id);

    useEffect( () => {
        async function fetchData() {
           await dispatch(FetchList(token));
           await dispatch(FetchChat({id: id, header : token}));
           await dispatch(FetchChat2({id: id, header : token}));
        }
        fetchData();
      }, [token]);

    const checkModal = useSelector(state => state.ShowModal);

    return <div className="w-full relative">
        <div className="shadow header fixed w-full bg-white">
            <Header />
        </div>
        <div className="w-full flex bg-gray-100 h-full relative pt-20 justify-center">
            <div className="w-1/6 fixed left-0">
                <LeftList />
            </div>
            <div className="w-4/6 px-4 pt-4">
                <MainStatus />
            </div>
            <div className="transition-700 w-1/6 w3-animate-right fixed right-0" style={{animationDuration: "0.7s"}} >
                <RightListFriend />
            </div>
            {checkModal && <div className="modal absolute"><FormCreate /></div>}

        </div>
    </div>
}

export default Home;
