import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Chat from '../components/Chat/Chat';
import { FetchConversation } from '../reducers/conversation';

function ChatPage({ match }) {

    const dispatch = useDispatch();

    const userID = useSelector(state => state.CheckLogin.current.id);

    const token = useSelector(state => state.CheckLogin.current.accessToken);

    const conversation = useSelector(state => state.Conversation);

    const Active = useSelector(state => state.CheckLogin);

    const list2 = useSelector(state => state.FetchListChat2);

    const ListUser = useSelector(state => state.FetchAllUser);

    const SortArr = (array) => {
        return array.sort(function (a, b) {
            return a.createdAt.localeCompare(b.createdAt);
        })
    }

    useEffect(() => {
        document.title = 'Nhắn tin | Transper'
    }, []);

    useEffect(() => {
        async function fetchData() {
            dispatch(FetchConversation({
                senderId: userID, recipientId: Number.parseInt(match.params.id), header: token
            }));
        }
        fetchData();
    }, [token, match]);

    var idChat;

    var check = false;

    var name = "";

    var arr = [];

    for (let i = 0; i < list2.length; i++) {
        if (list2[i].idA === Number.parseInt(match.params.id)) {
            check = true;
            name = `${list2[i].userA.lastName} ${list2[i].userA.firstName}`;
            arr = SortArr([...list2[i].messages]);
            idChat = list2[i].id;
            break;
        }
        if (list2[i].idB === Number.parseInt(match.params.id)) {
            check = true;
            name = `${list2[i].userB.lastName} ${list2[i].userB.firstName}`;
            arr = SortArr([...list2[i].messages]);
            idChat = list2[i].id;
            break;
        }
    }
    if (!check) {
        for (let i = 0; i < ListUser.length; i++) {
            if (ListUser[i].id === Number.parseInt(match.params.id)) {
                name = `${ListUser[i].lastName} ${ListUser[i].firstName}`;
                break;
            }
        }

        idChat = conversation.id;
    }

    if (Active.isAuth === false) {
        return <Redirect to="/login" />
    }
    else return <div className="w-full">
        <Chat id={match.params.id} check={check} name={name} arr={arr} idChat={idChat} />
    </div>
}

export default ChatPage;