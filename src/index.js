import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import storeConfig from './app/store';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/integration/react'

const { persistor, store } = storeConfig();

var config = {
	apiKey: "AIzaSyAU3uGPGY4LmDN_N_ypALo2RRHVkor0Md8",
	authDomain: "diachivietnam-c71f5-default-rtdb.firebaseio.com",
	databaseURL: "https://diachivietnam-c71f5-default-rtdb.firebaseio.com",
	storageBucket: "diachivietnam-c71f5.appspot.com"
};
firebase.initializeApp(config);
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
