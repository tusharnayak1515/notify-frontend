import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import Button from '../UI/Button';

import styles from './login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector(state => state.userReducer.user);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  const onSubmit = () => {
    dispatch(actionCreators.login(userDetails));
    setUserDetails({ email: "", password: "" });
  }

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate,token]);

  return (
    <div className={styles.login}>
      <h1>LOGIN</h1>
      <div className={styles.form}>
        <input type="email" name='email' value={userDetails.email} onChange={onChangeHandler} placeholder="Enter your email" />
        <input type="text" name='password' value={userDetails.password} onChange={onChangeHandler} placeholder="Enter your password" />
        <Button bg='green' onClick={onSubmit}>LOGIN</Button>
      </div>
    </div>
  )
}

export default Login