import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import LeftList from "../LeftList/LeftList";
import RightListFriend from "../RightListFriend/RightListFriend";
import ScrollColor from './ScrollColor';
import './Chat.scss';
import FormChat from './FormChat';
import { Link } from 'react-router-dom';
import { FetchConversation } from '../../reducers/conversation';
import { useDispatch, useSelector } from 'react-redux';
import { FetchChat } from '../../reducers/FetchListChat';

function Chat(props) {

    const dispatch = useDispatch();

    const { id, check, name, arr } = props;

    const User = useSelector(state => state.CheckLogin);

    const Info = useSelector(state => state.CheckLogin.current.userInfo);

    const list = useSelector(state => state.FetchListChat);

    const [checkWhoMess, setCheckWhoMess] = useState({
        id: id, name: name
    });

    const conversation = useSelector(state => state.Conversation);

    const [listMess, setListMess] = useState(arr);

    useEffect(() => {
        setListMess(arr);
    }, [id]);

    const HandleChangeMess = (item) => {
        setCheckWhoMess({
            id: item.id,
            name: item.name
        });
        dispatch(FetchConversation({
            senderId: User.current.id, recipientId: Number.parseInt(item.id), header: User.current.accessToken
        }));
        dispatch(FetchChat({ id: User.current.id, header: User.current.accessToken }));
    }

    const ShowListChat = (listChat) => {
        let result;
        if (listChat.length > 0) {
            result = listChat.map((item, index) => {
                return (
                    <Link to={`/chat/${item.id}`} className={`flex items-center py-3 border-t border-gray-200 cursor-pointer ${checkWhoMess === index ? 'bg-gray-50' : 'bg-white'}`}
                        onClick={() => {
                            HandleChangeMess({ id: item.id, name: `${item.lastName} ${item.firstName}` });
                        }} key={index}>
                        <div className="bg-avataImage2 bg-no-repeat bg-cover h-14 w-14 rounded-lg" />
                        <div className="ml-4">
                            <p className="opacity-80">{`${item.lastName} ${item.firstName}`}</p>
                            <p className="opacity-60 text-xs">{item.username}</p>
                        </div>
                    </Link>
                )
            })
        }
        return result;
    }

    return <div className="w-full relative">
        <div className="shadow header fixed w-full bg-white">
            <Header />
        </div>
        <div className="w-full h-screen flex bg-gray-100 relative pt-20 justify-center pl-6 pr-4">
            <div className="fixed left-0 w-1/6">
                <LeftList />
            </div>
            <div className="w-4/6 px-4 pt-4 pb-8 h-full flex items-center">
                <div className="w-1/4 h-full bg-white px-3 py-4" style={{ borderRadius: "10px 0px 0px 10px" }}>
                    <div className="bg-white pb-6 bg-white z-50">
                        <div className="flex items-center">
                            <div className="bg-avataImage bg-no-repeat bg-cover h-16 w-16 rounded-lg" />
                            <div className="ml-4">
                                <p className="opacity-80">{`${Info.lastName} ${Info.firstName}`}</p>
                                <p className="opacity-60">{User.current.username}</p>

                            </div>
                        </div>
                        <div className="flex items-center justify-center border border-gray-200 p-3 rounded-lg mt-6 px-2">
                            <i className="fas fa-search text-blue-300 mr-3"></i>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full focus:border-none focus:outline-none"
                            />
                        </div>
                    </div>
                    <ScrollColor
                        style={{ height: 380 }}
                    >
                        {ShowListChat(list)}
                    </ScrollColor>
                </div>
                <div className="w-3/4 h-full bg-bgChat bg-cover bg-no-repeat h-full" style={{ borderRadius: "0px 10px 10px 0px" }}>
                    {list.length === 0 ? <div className="flex items-center justify-center h-full">
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="h-20 w-20 bg-white text-blue-400 flex items-center justify-center text-4xl rounded-full">
                                    <i className="far fa-comment-dots"></i>
                                </div>
                            </div>

                            <div className="p-2 bg-white rounded-lg opacity-90 mt-3">
                                <p>Bắt đầu cuộc trò chuyện !</p>
                            </div>
                        </div>
                    </div> :
                        <FormChat arr={(listMess !== null && check === true) ? listMess : []}
                            idChat={conversation.id !== null ? conversation.id : 0}
                            name={checkWhoMess.name !== null ? checkWhoMess.name : ""}
                            senderId={User.current.id} recipientId={checkWhoMess.id !== null ? checkWhoMess.id : id}
                            checkOther={check}
                            header={User.current.accessToken}
                        />
                    }

                </div>
            </div>
            <div className="w-1/6 w3-animate-right fixed right-0" style={{ animationDuration: "0.7s" }}>
                <RightListFriend />
            </div>

        </div>
    </div>
}

export default Chat;