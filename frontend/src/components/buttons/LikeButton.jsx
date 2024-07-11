import {useState} from 'react';

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import styles from './Button.module.css';

function LikeButton({post, self, value, sizeClass}) {
    const [liked, setLiked] = useState(value);
    let [likes, setLikes] = useState(post.liked.length);

    const location = window.location.hostname;

    function changeLiked(e) {
        e.stopPropagation();

        fetch(`http://${location}:3050/api/post/${post._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: self,
                value: !liked
            })
        })
         .then(resp => resp.json())
         .then((dados) => {
            setLiked(!liked);
            setLikes(dados.value);
         })
         .catch(err => console.log(err))
    }

    return (
        <button className={`${styles.icon} ${styles[sizeClass]}`} onClick={changeLiked}>
            {liked ? (
                <FaHeart className={styles.liked} />
            ) : (
                <FaRegHeart />
            )}
            {likes > 0 ? (
                <p className={styles.number}>{likes}</p>
            ) : null}
        </button>
    )
}

export default LikeButton;