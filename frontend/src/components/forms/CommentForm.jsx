import {useState} from 'react';

import { IoSend } from "react-icons/io5";

import styles from './CommentForm.module.css';

function CommentForm({handleForm}) {
    const [comment, setComment] = useState("");

    function adjustSize(e) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        setComment(e.target.value)
    }

    function submit(e) {
        e.preventDefault();
        handleForm(comment);
    }

    return (
        <div className={styles["form-container"]}>
            <form>
                <textarea autoFocus={true} placeholder="Comente sua opinião" className={styles.text} onInput={adjustSize} rows="1"></textarea>
                <IoSend onClick={submit} />
            </form>
        </div>
    )
}

export default CommentForm;