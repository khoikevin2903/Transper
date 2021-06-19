import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { changeOption } from '../../reducers/optionShow';
import { SOCKET_URL } from '../../constants/Socket_URL';
import SockJsClient from 'react-stomp';

function RightListFriend(props) {

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const username = useSelector(state => state.CheckLogin.current.username);

    let clientRef = useRef(null);
    const [actives, setActives] = useState([])

    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://chatchit69.herokuapp.com/api/active/active-users-except/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setActives(res.data));
        }
        fetchData();
       
    }, [token])

    

    return (
        <div>
            <ul className="w-full bg-white shadow h-screen pt-2">
                {actives.length > 0 ? actives.map((item, index) => {
                    if (item.username !== username)
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
                                    <p className="text-blue-400 text-sm">Đang hoạt động</p>
                                </div>
                            </Link>
                        </div>
                    )
                }) : []}
            </ul>
            <SockJsClient url={SOCKET_URL}
                topics={[`/topic/active-users-list`]}
                onConnect={() => {
                    console.log("connected");
                }}
                onDisconnect={() => {
                    console.log("disconnected");
                }}
                onMessage={(msg) => {

                    // message.push(msg);
                    // await dispatch(FetchChat2({ id: senderId, header: header }));
                    // await dispatch(FetchChat({ id: senderId, header: header }));
                    // scrollToBottom();
                    setActives(msg)
                    //setMessage([...message]);
                }}
                ref={(client) => {
                    clientRef = client;
                }}
            />
        </div>
    );
}

export default RightListFriend;