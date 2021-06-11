import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { changeOption } from '../../reducers/optionShow';

function RightListFriend(props) {

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const username = useSelector(state => state.CheckLogin.current.username);
    const [listActive, setListActive] = useState([])


    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://chatchit69.herokuapp.com/api/active/active-users-except/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setListActive(res.data));
        }
        fetchData();
    }, [token])

    const showList = (list) => {
        let result = [];
        result = list.length > 0 ? list.map((item, index) => {
            return (
                <div className="pb-1 w-full" key={index}
                    onClick={() => changeOption(1)}>
                    <Link to={`/chat/${item.id}`} className="w-full flex items-center ">
                        <div className="px-4 py-2">
                            {item.gender === true ?
                                <img className="h-12 w-12 rounded-full" src="https://iqonic.design/themes/socialv/html/images/user/02.jpg" alt="" />
                                : <img className="h-12 w-12 rounded-full" src="https://iqonic.design/themes/socialv/html/images/user/01.jpg" alt="" />
                            }
                        </div>
                        <div className="text-base pl-1">
                            <p>{`${item.lastName} ${item.firstName}`}</p>
                            <p className="text-gray-400">{item.email}</p>
                        </div>
                    </Link>
                </div>
            )
        }) : []
        return result;
    }

    return (
        <ul className="w-full bg-white shadow h-screen pt-2">
            {showList(listActive)}
        </ul>
    );
}

export default RightListFriend;