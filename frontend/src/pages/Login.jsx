import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './Login.module.css';

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
        <div className={styles.login}>
            <h1>Login</h1>
            <input type="text" placeholder="Nome de Usuário" onInput={setUsername} />
            <button onClick={login}>Entrar</button>
        </div>
    )
}

export default Login;