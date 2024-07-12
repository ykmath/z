import {useState, useEffect} from 'react';

import { FaEdit } from "react-icons/fa";

import styles from './Aside.module.css';

function Aside({user}) {
    const [userPhoto, setUserPhoto] = useState("");
    const [editMode, setEditMode] = useState(false);

    const location = window.location.hostname;

    useEffect(() => {
        if (user === null) return;
        fetch(`http://${location}:3050/api/user/${user}`)
         .then(r => r.json())
         .then((dados) => {
            if (dados.value.length === 0) {
                setUserPhoto("https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png");
                return;
            };

            setUserPhoto(dados.value.img);
         })
         .catch(err => console.log(err))
    }, [user])

    function editPhoto(e) {
        e.preventDefault();
        const url = e.target.url.value;
        if (!url || url === "") return;

        fetch(`http://${location}:3050/api/user/${user}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: url
            })
        })
         .then(resp => resp.json())
         .then((dados) => {
            setUserPhoto(dados.value);
         })
         .catch(err => console.log(err));

        cancelEdit();
    }

    function edit() {
        setEditMode(true);
    }

    function cancelEdit() {
        setEditMode(false);
    }

    return (
        <aside className={styles.aside}>
            <div className={styles["image-container"]}>
                <img src={userPhoto} />
            </div>
                {editMode ? (
                    <form className={styles.editMode} onSubmit={editPhoto}>
                        <h2>Foto de Perfil</h2>
                        <input type="text" name="url" placeholder="Url da Imagem" />
                        <button type="submit" className={styles.changeBtn} >Trocar</button>
                        <button type="reset" className={styles.cancelBtn} onClick={cancelEdit} >Cancelar</button>
                    </form>
                ) : (
                    <FaEdit onClick={edit} />
                )}
            <h1>{user}</h1>
        </aside>
    )
}

export default Aside;