import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOption } from '../../reducers/optionShow';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import LeftListOption from '../../constants/LeftListOption';

function LeftList(props) {

    const ListChat = useSelector(state => state.FetchListChat);

    const dispatch = useDispatch();

    const options = useSelector(state => state.OptionShow);

    const check = useSelector(state => state.LeftList);

    const checkRoles = useSelector(state => state.CheckLogin.current.roles);


    useEffect(
        () => {

        }, [ListChat]
    )

    const showList = (list) => {
        let id = '0';
        let result = null;
        if (list.length > 0) {
            result = list.map((item, index) => {
                if (ListChat.length > 0) id = ListChat[0].id + "";
                return (
                    <Link to={(item.option === 1) ? `${item.path}/${id}` : item.path} className="cursor-pointer" key={index}
                        onClick={() => {
                            dispatch(changeOption(item.option));
                        }}
                    >
                        <div className={ClassNames('mx-4 flex items-center rounded-md text-gray-500 hover:text-blue-300', { 'bg-gray-100 text-blue-400': options === index, 'mt-3': index !== 0 })}>
                            {item.icon}
                            {check && <p className="w-2/3 text-sm">{item.name}</p>}
                        </div>
                    </Link>
                )
            });
        }
        return result;
    }

    const ShowCheckRole = () => {
        let result = null;
        if (checkRoles) {
            checkRoles.map(item => {
                if (item === "ROLE_ADMIN") {
                    result = (
                        <Link to='/admin/contactsGrid' className="cursor-pointer"
                            onClick={() => {
                                dispatch(changeOption(5));
                            }}
                        >
                            <div className={ClassNames('mx-4 flex items-center mt-3 rounded-md text-gray-500 hover:text-blue-300', { 'bg-gray-100 text-blue-400': options === 5 })}>
                                <i className="fas fa-list-ol w-1/3 py-4 px-6" />
                                {check && <p className="w-2/3 text-sm">Quản lý người dùng</p>}
                            </div>
                        </Link>
                    )
                }
                return item;
            })
        }
        return result;
    }

    return (
        <ul className={`h-screen shadow bg-white duration-500 ${check ? 'w-full' : 'w-1/3'}`}>
            <div className="h-1/2 pt-3">
                {showList(LeftListOption)}
                {ShowCheckRole()}
            </div>

        </ul>
    );
}

export default LeftList;