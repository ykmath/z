import {useState, useEffect} from 'react';

import styles from './CommentBox.module.css';

function CommentBox({comentario}) {
    const [img, setImg] = useState("");
    const location = window.location.hostname;

    useEffect(() => {
        if (comentario === null) return;
        fetch(`http://${location}:3050/api/user/${comentario.usuario}`)
         .then(r => r.json())
         .then((dados) => {
            setImg(dados.value[0].img);
         })
         .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.comment}>
            <div className={styles["comment-image"]}>
                <img src={img} />
            </div>
            <div className={styles["comment-text"]}>
                <h2>{comentario.usuario}</h2>
                <p>{comentario.texto}</p>
            </div>
        </div>
    )
}

export default CommentBox;