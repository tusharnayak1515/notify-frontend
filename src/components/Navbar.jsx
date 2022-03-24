import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 

import styles from './navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  let isUser = useSelector(state=> state.userReducer.user);
  const onLogout = ()=> {
    dispatch(actionCreators.logout());
  }

  const [isShow, setIsShow] = useState(false);

  const onToggle = ()=> {
    const toggle = document.querySelector('ul');
    if(!isShow) {
        toggle.style.display = 'flex';
        setIsShow(true);
    }
    else {
        toggle.style.display = 'none';
        setIsShow(false);
    }
  }
  
  return (
    <div id={styles.navbar}>
        <div id={styles.logo}>
            <h1>Notify</h1>
            <div className={styles.menu} onClick={onToggle}>
              <FontAwesomeIcon icon={faBars} size='2x' />
            </div>
        </div>
        <div id={styles.links}>
            <ul>
                {isUser && <li><Link to='/'>Home</Link></li>}
                {!isUser && <li><Link to='/register'>Register</Link></li>}
                {!isUser && <li><Link to='/login'>Login</Link></li>}
                {isUser && <li><Link to='/profile'>Profile</Link></li>}
                {isUser && <li><p onClick={onLogout}>Logout</p></li>}
            </ul>
        </div>
    </div>
  )
}

export default Navbar