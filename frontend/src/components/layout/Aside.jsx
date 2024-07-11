import {useState, useEffect} from 'react';

import styles from './Aside.module.css';

function Aside({user}) {
    const [userPhoto, setUserPhoto] = useState("");

    const location = window.location.hostname;

    useEffect(() => {
        if (user === null) return;
        fetch(`http://${location}:3050/api/user/${user}`)
         .then(r => r.json())
         .then((dados) => {
            setUserPhoto(dados.value[0].img);
         })
         .catch(err => console.log(err))
    }, [user])

    return (
        <aside className={styles.aside}>
            <div className={styles["image-container"]}>
                {userPhoto && (
                    <img src={userPhoto} />
                )}
            </div>
            <h1>{user}</h1>
        </aside>
    )
}

export default Aside;