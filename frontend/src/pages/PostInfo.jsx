import {useState, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import LikeButton from '../components/buttons/LikeButton';
import CommentButton from '../components/buttons/CommentButton';
import CommentBox from '../components/CommentBox';
import CommentForm from '../components/forms/CommentForm';
import PostHeader from '../components/layout/PostHeader';

import styles from './PostInfo.module.css';

function PostInfo() {
    const location = useLocation();
    const hostLocation = window.location.hostname;
    const params = useParams();

    const editing = location.state?.newComment;
    const id = params.id;
    
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [img, setImg] = useState("");
    const [comments, setComments] = useState(null);
    const [commenting, setComenting] = useState(editing || false);    

    useEffect(() => {
        const logged = sessionStorage.getItem("nome");
        
        if (logged) {
            setUser(logged);
        } else {
            return navigate("/login");
        }

        fetch(`http://${hostLocation}:3050/api/post/${id}`)
         .then(resp => resp.json())
         .then((dados) => {
            setPost(dados);
            setComments(dados.comentarios.reverse());
         })
         .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (post === null) return;
        fetch(`http://${hostLocation}:3050/api/user/${post.usuario}`)
         .then(r => r.json())
         .then((dados) => {
            console.log(dados)
            setImg(dados.value.img);
         })
         .catch(err => console.log(err))
    }, [post])

    function handleNewComment() {
        setComenting(!commenting);
    }

    function sendComment(text) {
        setComenting(false);
        fetch(`http://${hostLocation}:3050/api/comment/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                usuario: user,
                msg: text
            })
        })
         .then(resp => resp.json())
         .then((data) => {
            console.log(data);
            setComments(data.value.comentarios.reverse());
         })
         .catch(err => console.log(err))
    }

    return (
        (post && (
            <>
                <PostHeader title="Post" />
                <div className={styles.post}>
                <div className={styles["image-container"]}>
                    <img src={img} />
                </div>
                <div className={styles["text-container"]}>
                    <div className={styles.msg}>
                        <h1>{post.usuario}</h1>
                        <p>{post.texto}</p>
                    </div>
                    <div className={styles.buttons}>
                        <CommentButton value={comments.length} link={false} sizeClass="big" handleNewComment={handleNewComment} />
                        <LikeButton post={post} self={user} value={Array.from(post.liked).includes(user)} sizeClass="big" />
                    </div>
                </div>
                </div>
                {commenting && (
                    <CommentForm handleForm={sendComment} />
                )}
                {comments && comments.length > 0 ? comments.map((comment) => (
                    <CommentBox comentario={comment} key={comment._id}/>
                )) : (
                    <div className={styles["not-found"]}>
                        <h2>Não há comentários.</h2>
                    </div>
                )}
            </>
            
        ))
    )
}

export default PostInfo