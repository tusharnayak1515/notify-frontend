import React from 'react';
import { Link } from 'react-router-dom';

import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div id={styles.navbar}>
        <div id={styles.logo}>
            <h1>Notify</h1>
        </div>
        <div id={styles.links}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Register</Link></li>
                <li><Link to='/'>Login</Link></li>
                <li><Link to='/'>Profile</Link></li>
                <li><Link to='/'>Logout</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar