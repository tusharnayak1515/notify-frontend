import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import Button from '../UI/Button';

import styles from './register.module.css';

const Register = () => {
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state=> state.userReducer.user);
  const error = useSelector((state) => state.userReducer.error);
  const [userDetails, setUserDetails] = useState({ name: "", username: "", email: "", password: "" });
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  const onSubmit = ()=> {
    dispatch(actionCreators.register(userDetails));
    setUserDetails({ name: "", username: "", email: "", password: "" });
  }

  useEffect(()=>{
    if (token) {
      navigate('/', { replace: true })
    }

    if(error) {
      setIsError(true);
    }

    if(!error) {
      setIsError(false);
    }

    return ()=> {
      localStorage.removeItem("error");
      setIsError(false);
    }

  },[navigate,token,error]);

  return (
    <div className={styles.register}>
      <h1>REGISTER</h1>
      <div className={styles.form}>
        <input type="text" name='name' value={userDetails.name} onChange={onChangeHandler} placeholder="Enter your name" />
        <input type="text" name='username' value={userDetails.username} onChange={onChangeHandler} placeholder="Enter your username" />
        <input type="email" name='email' value={userDetails.email} onChange={onChangeHandler} placeholder="Enter your email" />
        <input type="text" name='password' value={userDetails.password} onChange={onChangeHandler} placeholder="Enter your password" />
        <Button bg='green' onClick={onSubmit} >REGISTER</Button>
      </div>
      {isError && <div className={styles.error}><p>{error}</p></div>}
    </div>
  )
}

export default Register