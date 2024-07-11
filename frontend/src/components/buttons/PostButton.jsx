import {useNavigate} from 'react-router-dom'

import { IoIosAdd } from "react-icons/io";

import styles from './PostButton.module.css';

function PostButton({pos, user}) {
    const navigate = useNavigate();

    function newPost() {
        navigate("/newpost");
    }

    return (
        <button className={`${styles.btn} ${styles[pos]}`} onClick={newPost}>
            <IoIosAdd />
        </button>
    )
}

export default PostButton;