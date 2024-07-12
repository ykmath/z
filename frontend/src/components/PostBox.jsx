import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import CommentButton from './buttons/CommentButton';
import LikeButton from './buttons/LikeButton';

import styles from './PostBox.module.css';

function PostBox({post, self}) {
    const usuario = post.usuario;
    const texto = post.texto;
    const [img, setImg] = useState("");

    const location = window.location.hostname;
    
    const navigate = useNavigate();
    const liked = Array.from(post.liked).includes(self);

    function navi() {
        navigate(`/post/${post._id}`)
    }

    useEffect(() => {
        fetch(`http://${location}:3050/api/user/${usuario}`)
         .then(r => r.json())
         .then((dados) => {
            setImg(dados.value.img);
         })
         .catch(err => console.log(err))
    }, [usuario])

    return (
        <div to={`/post/${post._id}`} className={styles.container} onClick={navi}>
            <div className={styles["img-container"]}>
                <img src={img} />
            </div>
            <div className={styles["msg-container"]}>
                <div className={styles["text-container"]}>
                    <h2>{usuario}</h2>
                    <p>{texto}</p>
                </div>
                <div className={styles["button-container"]}>
                    <CommentButton post={post} value={post.comentarios.length} />
                    <LikeButton post={post} self={self} value={liked} />
                </div>
            </div>
        </div>
    )
}

export default PostBox;