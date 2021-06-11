import React, { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ClassNames from 'classnames';
import { SOCKET_URL } from '../../constants/Socket_URL';
import SockJsClient from 'react-stomp';
import { useDispatch } from 'react-redux';
import { FetchChat } from '../../reducers/FetchListChat';
import { FetchChat2 } from '../../reducers/FetchListChat2';


function FormChat(props) {

    const dispatch = useDispatch();

    const { senderId, recipientId, name, arr, idChat, checkOther, header } = props;

    const [message, setMessage] = useState([]);

    useEffect(() => {
        setMessage(arr);
        if (!checkOther) {
            dispatch(FetchChat({ id: senderId, header: header }));
        }
    }, [idChat])

    const [check, setCheck] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const [mess, setMess] = useState('');

    useEffect(scrollToBottom, [mess]);

    let clientRef = useRef(null);

    const HandleChangeMess = (e) => {
        const target = e.target;
        const value = target.value;
        setMess(value);
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (mess !== "") {
            await clientRef.sendMessage('/app/chat', JSON.stringify({
                recipientId: Number.parseInt(recipientId),
                senderId: senderId,
                content: mess
            }));
            setTimeout(setMess(''), 300);
        }
    }

    const elm = message.length > 0 ? message.map((item, index) => {
        return (
            <div className={ClassNames("py-2 px-3", {
                "text-right": item.senderId === senderId,
                "flex items-center": item.senderId !== senderId
            })} key={index}>
                {(item.senderId !== senderId) ?
                    <div className="bg-avataImage2 bg-no-repeat bg-cover h-8 w-8 rounded-full mr-2"></div>
                    : <div className="w-8 mr-2"></div>
                }
                <div>
                    <span className="py-2 px-4 w-auto bg-blue-400 text-white rounded-full">{item.content}</span>
                </div>
            </div>
        )
    }) : "";

    return (
        <form className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center bg-white py-2 w-full justify-between">
                <div className="flex items-center text-xl">
                    <div className="mr-4 bg-avataImage2 bg-no-repeat bg-cover h-14 w-14 rounded-lg" />
                    <p className="opacity-80">{name}</p>
                </div>
                <div className="flex items-center">
                    <div className="text-blue-400 text-xl mx-1 p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                        <ion-icon name="call-outline"></ion-icon>
                    </div>
                    <div className="text-blue-400 text-xl mx-1 p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                        <ion-icon name="videocam-outline"></ion-icon>
                    </div>
                    <div className="text-blue-400 text-xl mx-1 p-3 bg-gray-50 rounded-lg flex items-center justify-center">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                    <div className="text-blue-400 text-xl mx-1 p-3 bg-gray-50 rounded-lg flex items-center justify-center"
                        onClick={() => setCheck(true)}
                    >
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div className="">
                <Scrollbars style={{ height: 450 }}>
                    <div className="pt-4">
                        {elm}
                        <div ref={messagesEndRef} />
                    </div>

                </Scrollbars>
            </div>
            <div className="flex items-center bg-white px-4 py-4 w-full">
                <div className="text-gray-500">
                    <i className="far fa-smile text-xl px-2"></i>
                </div>
                <div className="text-gray-500 px-2">
                    <i className="fas fa-paperclip"></i>
                </div>
                <input
                    value={mess}
                    onChange={HandleChangeMess}
                    name="content"
                    type="text"
                    placeholder="Type your message"
                    className="w-4/5 mx-2 px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
                <button className="p-2 rounded-lg bg-blue-500 text-white flex items-center justify-center"
                    onClick={sendMessage}
                >
                    <i className="far fa-paper-plane px-2"></i>
                    <span>send</span>
                </button>
            </div>
            <SockJsClient url={SOCKET_URL}
                topics={[`/topic/${idChat}/queue/messages`]}
                onConnect={() => {
                    
                }}
                onDisconnect={() => {

                }}
                onMessage={async (msg) => {
                    message.push(msg);
                    await dispatch(FetchChat2({ id: senderId, header: header }));
                    await dispatch(FetchChat({ id: senderId, header: header }));
                    scrollToBottom();
                    //setMessage([...message]);
                }}
                ref={(client) => {
                    clientRef = client;
                }}
            />
        </form>
    );
}

export default FormChat;