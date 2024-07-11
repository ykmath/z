import {Outlet} from 'react-router-dom';

import Navbar from './Navbar';
import Aside from './Aside';
import Feedbar from '../Feedbar';

import styles from '../Container.module.css';

function Layout({user}) {
    return (
        <>
            <Navbar />
            <div className={styles.layout}>
                <Aside user={user} />
                <Feedbar>
                    <Outlet />
                </Feedbar>
            </div>
        </>
    )
}

export default Layout;