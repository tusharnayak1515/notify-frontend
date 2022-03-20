import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import Todolist from './Todolist';

import styles from './home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.userReducer.user);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login', { replace: true })
    }
  }, [token, navigate]);
  return (
    <>
      {token && <div className={styles.home}>
        <h1 className={styles.head}>Notify - Create and access your todolist online!</h1>
        <TodoForm />
        <Todolist />
      </div>}
    </>
  )
}

export default Home