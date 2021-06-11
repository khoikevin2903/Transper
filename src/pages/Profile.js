import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Profile from '../components/Profile/Profile';

function ProfilePage(props) {

    const userInfo = useSelector(state => state.CheckLogin.current.userInfo);

    useEffect(() => {
        document.title = userInfo ? `${userInfo.lastName} ${userInfo.firstName} | Transper` : "";
    }, [userInfo]);

    const Active = useSelector(state => state.CheckLogin);

    if (Active.isAuth === false) {
        return <Redirect to="/login" />
    }
    else return <div className="w-full">
        <Profile />
    </div>
}

export default ProfilePage;