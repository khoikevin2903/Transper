import React, { useEffect } from 'react';
import error from '../image/404-light.gif';
import {Link, useHistory} from 'react-router-dom'
function Error(props) {

    const history = useHistory();

    useEffect(() => {
        document.title = 'Không tìm thấy | Transper'
    },[])

    return (
        <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#e1ff78' }}>
            <div>
                <img src={error} alt="" />
                <div className="flex items-center justify-center my-12">
                    <p>The page you are looking for was moved, removed,<br />
                        <span className="flex items-center justify-center opacity-80">renamed or might never existed.</span>
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Link to="/" className="mr-6 text-white bg-yellow-400 py-3 px-8 text-2xl opacity-90 font-extrabold rounded-md">
                        Go Home
                    </Link>
                    <button className="text-white bg-yellow-600 py-3 px-8 text-2xl opacity-90 font-extrabold rounded-md"
                        onClick={() => history.goBack()}
                    >
                        Back Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Error;