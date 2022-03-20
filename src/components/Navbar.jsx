import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../redux';

import styles from './navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  let isUser = useSelector(state=> state.userReducer.user);
  // let isUser;
  // if(localStorage.getItem("token")) {
  //   isUser = true;
  // }
  // else {
  //   isUser = false;
  // }
  const onLogout = ()=> {
    dispatch(actionCreators.logout());
  }
  return (
    <div id={styles.navbar}>
        <div id={styles.logo}>
            <h1>Notify</h1>
        </div>
        <div id={styles.links}>
            <ul>
                {isUser && <li><Link to='/'>Home</Link></li>}
                {!isUser && <li><Link to='/register'>Register</Link></li>}
                {!isUser && <li><Link to='/login'>Login</Link></li>}
                {isUser && <li><Link to='/'>Profile</Link></li>}
                {isUser && <li><p onClick={onLogout}>Logout</p></li>}
            </ul>
        </div>
    </div>
  )
}

export default Navbar