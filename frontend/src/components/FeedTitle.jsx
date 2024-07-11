import styles from './FeedTitle.module.css';

function FeedTitle({title}) {
    return (
        <div className={styles.title}>
            <h2>{title}</h2>
        </div>
    )
}

export default FeedTitle;