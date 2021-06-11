import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import ContactsGrid from '../Admin/Component/Contacts/ContactsGrid';

function ContactsGridPage({match}) {

    useEffect(() => {
        document.title = 'Quản lý người dùng | Transper'
    }, []);

    const Active = useSelector(state => state.CheckLogin);

    if (Active.isAuth === false) {
        return <Redirect to="/login" />
    }
    else return <div className="w-full">
        <ContactsGrid />
    </div>
}

export default ContactsGridPage;