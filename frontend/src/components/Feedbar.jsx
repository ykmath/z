import styles from './Feedbar.module.css';

function Feedbar(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}

export default Feedbar;