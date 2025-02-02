import {useNavigate} from 'react-router-dom';

import { FaArrowRightToBracket } from "react-icons/fa6";

import styles from './PostHeader.module.css';

function PostHeader({title}) {
    const navigate = useNavigate();

    function returnHome() {
        navigate("/");
    }

    return (
        <div className={styles.header}>
            <button onClick={returnHome}><FaArrowRightToBracket /></button>
            <h1>{title}</h1>
        </div>
    )
}

export default PostHeader;