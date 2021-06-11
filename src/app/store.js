import { createStore } from '@reduxjs/toolkit';
import { combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import CheckLogin from './../reducers/checkLogin';
import ShowModal from './../reducers/showModal';
import LoginRegister from './../reducers/login-register';
import LeftList from './../reducers/leftList';
import OptionShow from './../reducers/optionShow';
import persistStore from 'redux-persist/es/persistStore';
import InfoPlace from './../reducers/infoPlace';
import InfoPlaceName from './../reducers/infoPlaceName';
import Place from './../reducers/place';
import DisTrictsStart from './../reducers/districtsStart';
import DisTrictsEnd from './../reducers/districtsEnd';
import FetchListPost from './../reducers/fetchListPost';
import OtherUser from './../reducers/otherUser';
import FetchAllUser from './../reducers/FetchAllUser';
import FetchListChat from './../reducers/FetchListChat';
import Conversation from './../reducers/conversation';
import thunk from "redux-thunk";
import {applyMiddleware} from 'redux';
import MyPost from './../reducers/fetchMyPost';
import Information from './../reducers/changeInformation';
import FetchListChat2 from './../reducers/FetchListChat2';
import ActiveUser from './../reducers/ActiveUser';
import Account from './../reducers/username-password';


const rootReducer = combineReducers({
    CheckLogin: CheckLogin,
    LoginRegister: LoginRegister,
    LeftList: LeftList,
    OptionShow: OptionShow,
    ShowModal: ShowModal,
    InfoPlace: InfoPlace,
    InfoPlaceName: InfoPlaceName,
    Place: Place,
    DisTrictsStart: DisTrictsStart,
    DisTrictsEnd: DisTrictsEnd,
    FetchListPost: FetchListPost,
    OtherUser: OtherUser,
    FetchAllUser: FetchAllUser,
    FetchListChat: FetchListChat,
    Conversation : Conversation,
    MyPost: MyPost,
    Information: Information,
    FetchListChat2: FetchListChat2,
    ActiveUser: ActiveUser,
    Account: Account
});

const persistConfig = {
    key: 'root',
    storage
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return {store, persistor}
}