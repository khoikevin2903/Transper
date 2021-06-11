import React, {useEffect} from "react";
import BgLogin from "../components/Login/BgLogin/BgLogin";
import Register from "../components/Login/Login-Register-Form/RegisterForm";


function RegisterPage(props) {

	useEffect(() => {
        document.title = 'Đăng ký | Transper'
    }, []);

	return (
		<div className="h-full w-full">
			<div className="h-full w-full flex">
				<Register />
				<BgLogin />
			</div>
		</div>
	);
}

export default RegisterPage;
