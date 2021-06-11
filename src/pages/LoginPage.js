import React, {useEffect} from "react";
import BgLogin from "../components/Login/BgLogin/BgLogin";
import Login from "../components/Login/Login-Register-Form/LoginForm";
import { withRouter } from 'react-router-dom';

function LoginPage(props) {

	useEffect(() => {
        document.title = 'Đăng Nhập | Transper'
    }, []);

	return (
		<div className="h-full w-full">
			<div className="h-full w-full flex">
				<BgLogin />
				<Login />
			</div>
		</div>
	);
}

export default withRouter(LoginPage);
