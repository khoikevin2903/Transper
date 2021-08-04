import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './routes';
import firebase from 'firebase';
import { setData } from './reducers/place';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from './reducers/login-register';
import ContactGridPage from './pages/ContactGridPage';
import { fetchUser } from './reducers/FetchAllUser';
//import { onLogout } from './reducers/checkLogin';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import axios from 'axios';
import * as Config from './constants/Config';
import Error from './pages/Error';
import { useIdleTimer } from 'react-idle-timer'

function App(props) {

	const options = {
		timeout: 3000,
		position: positions.BOTTOM_CENTER
	};

	const dispatch = useDispatch();


	const handleOnIdle = async (event) => {
		await axios.get(`https://chatchit69.herokuapp.com/api/active/disconnect/${username}`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		}).then(res => res);
		console.log('user is idle', event)
		console.log('last active', getLastActiveTime())
	}

	const handleOnActive = async (event) => {
		await axios.get(`${Config.API_URL}/api/active/connect/${username}`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		}).then(res => res);
		console.log('user is active', event)
		console.log('time remaining', getRemainingTime())
	}

	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * 30,
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		debounce: 500
	})

	async function fetchData() {
		await dispatch(fetchUser(accessToken));
	}
	const accessToken = useSelector(state => state.CheckLogin.current.accessToken);

	const username = useSelector(state => state.CheckLogin.current.username);

	const checkRoles = useSelector(state => state.CheckLogin.current.roles);
	if (checkRoles) {
		checkRoles.map(item => {
			if (item === "ROLE_ADMIN") {
				ROUTES.push({
					path: "/admin/contactsGrid",
					exact: true,
					main: ContactGridPage,
				});
				fetchData();
			}
		})
		ROUTES.push({
			path: "*",
			exact: true,
			main: Error,
		});
	}


	const doSomeThing = async (e) => {

		function sendSimpleBeacon(data) {
			if (!navigator.sendBeacon) return;
			var url = "https://chatchit69.herokuapp.com/api/active/disconnect";
			var data = "data=" + data;
			var status = navigator.sendBeacon(url + "?" + data);
		}
		sendSimpleBeacon(username)
	}

	const setupBeforeUnLoad = () => {
		window.addEventListener('beforeunload', (e) => {
			e.preventDefault();
			return doSomeThing();
		})
	}

	useEffect(() => {
		setupBeforeUnLoad();
		FetchData();
		dispatch(onLogin());
		axios.get(`${Config.API_URL}/api/active/connect/${username}`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		}).then(res => res);
		//dispatch(onLogout())
		//dispatch(changeOption(0));
	}, [accessToken, username])

	async function FetchData() {
		const db = await new Promise((a, b) => {
			var dbRef = firebase.database().ref();
			dbRef.on('value', snap => dispatch(setData(snap.val())));
		})
		return db;
	}

	return (
		<Router>
			<Provider template={AlertTemplate} {...options}>
				<div style={{ fontFamily: 'sans-serif' }}>
					<div className="Noke">
						<div className="w-full">
							{
								showContentMenus(ROUTES)
							}
						</div>
					</div>
				</div>
			</Provider>
		</Router>
	)
}
const showContentMenus = (routes) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact={route.exact}
				render={props => <route.main {...props} />}
			/>)

		})
	}
	return <Switch>{result}</Switch>
}

export default App

