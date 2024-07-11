import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import FeedTitle from "../components/FeedTitle";
import PostBox from '../components/PostBox';

import styles from './Home.module.css';
import PostButton from '../components/buttons/PostButton';

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = window.location.hostname;

    useEffect(() => {
        const logged = sessionStorage.getItem("nome");
        
        if (logged) {
            setUser(logged);
        } else {
            return navigate("/login");
        }

        fetch(`http://${location}:3050/api/post`)
         .then(resp => resp.json())
         .then((data) => setPosts(data))
         .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.container}>
                <FeedTitle title="Feed" />
                {posts.length > 0 ? posts.map((post, i) => (
                    <PostBox self={user} post={post} key={i} />
                )) : (
                    <div className={styles["not-found"]}>
                        <h2>Nenhum Post no Momento...</h2>
                    </div>
                )}
            </div>
            <PostButton pos="home" user={user} />
        </>
        
    )
}

export default Home;