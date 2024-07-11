import {Link} from 'react-router-dom';

import { FaRegMessage } from "react-icons/fa6";

import styles from './Button.module.css';

function CommentButton({post, value, link=true, sizeClass, handleNewComment}) {
    const comments = value;
    
    function stopPropagation(e) {
        e.stopPropagation();
    }

    return (
        <>
            {link ? (
                <Link to={`/post/${post._id}`} state={{newComment: true}} className={styles.icon} onClick={stopPropagation}>
                    <FaRegMessage />
                    {comments > 0 ? (
                        <p className={styles.number}>{comments}</p>
                    ) : null}
                </Link>
            ) : (
                <button className={`${styles.icon} ${styles[sizeClass]}`} onClick={handleNewComment}>
                    <FaRegMessage />
                    {comments > 0 ? (
                        <p className={styles.number}>{comments}</p>
                    ) : null}
                </button>
            )}
        </>
    )
}

export default CommentButton;