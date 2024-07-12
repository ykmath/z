import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import PostHeader from '../components/layout/PostHeader';

import styles from './NewPost.module.css';

function NewPost({user}) {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    const location = window.location.hostname;

    function adjustSize(e) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        setText(textarea.value)
    }

    function createNewPost() {
        if (text === "" || !user) return;
        fetch(`http://${location}:3050/api/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: user,
                msg: text
            })
        })
         .then(resp => resp.json())
         .then((data) => {
            navigate("/", {state: {msg: "Post criado!"}})
         })
         .catch(err => console.log(err));
    }

    useEffect(() => {
        if (user === null) return;
        fetch(`http://${location}:3050/api/user/${user}`)
         .then(r => r.json())
         .then((dados) => {
            console.log(dados)
            setImg(dados.value[0].img);
         })
         .catch(err => console.log(err))
    }, [user])

    return (
        <>
            <PostHeader />
            <div className={styles["post-container"]}>
                <div className={styles["post-image"]}>
                    <img src={img} />
                </div>
                <div className={styles["post-comment"]}>
                    <h1>{user}</h1>
                    <textarea autoFocus={true} onInput={adjustSize}></textarea>
                </div>
            </div>
            <button className={styles.button} onClick={createNewPost}>Enviar</button>
        </>
    )
}

export default NewPost;