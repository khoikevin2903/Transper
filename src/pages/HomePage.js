import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Home from '../components/Home/Home';

function HomePage(props) {

    useEffect(() => {
        document.title = 'Trang chủ | Transper'
    }, []);

    const Active = useSelector(state => state.CheckLogin);

    if (Active.isAuth === false) {
        return <Redirect to="/login" />
    }
    else return <div className="w-full">
        <Home />
    </div>
}

export default HomePage;