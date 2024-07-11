import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login({logUser}) {
    const [user, setUser] = useState();
    
    const navigate = useNavigate();

    function login() {
        if (user) {
            logUser(user);
            navigate("/");
        }
    }

    function setUsername(e) {
        setUser(e.target.value);
    }


    return (
        <div>
            <h2>logue-se</h2>
            <input type="text" onInput={setUsername} />
            <button onClick={login}>loga</button>
        </div>
    )
}

export default Login;