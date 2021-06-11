import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import OtherProfile from '../components/OtherProfile/OtherProfile';

function OtherProfilePage({match}) {

    const Active = useSelector(state => state.CheckLogin);

    if (Active.isAuth === false) {
        return <Redirect to="/login" />
    }
    else return <div className="w-full">
        <OtherProfile name={match.params.id}/>
    </div>
}

export default OtherProfilePage;