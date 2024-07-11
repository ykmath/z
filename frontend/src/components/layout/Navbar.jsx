import {Link} from 'react-router-dom';

import logo from '../../assets/Z-Logo.svg';

import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link to={"/"}><img src={logo} alt="Z" /></Link>
        </nav>
    )
}

export default Navbar;