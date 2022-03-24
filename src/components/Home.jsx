import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './home.module.css';

const TodoForm = React.lazy(() => import('./TodoForm'));
const Todolist = React.lazy(() => import('./Todolist'));

const Home = () => {
  const dispatch = useDispatch();
  let todayDate = new Date();
  let mydate = todayDate.getDate();
  let mymonth = todayDate.getMonth() + 1;
  let myyear = todayDate.getFullYear();

  let currentDate = `${mydate}/${mymonth}/${myyear}`;

  const [presentDate, setPresentDate] = useState(currentDate);
  const navigate = useNavigate();
  const token = useSelector(state => state.userReducer.user);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login', { replace: true })
    }
    return () => {
      localStorage.removeItem("error");
      dispatch(actionCreators.cancelError());
    }
  }, [token, navigate, dispatch]);
  return (
    <>
      {token && <div className={styles.home}>
        <h1 className={styles.head}>Notify - Create and access your todolist online!</h1>
        <Suspense fallback={<div><LoadingSpinner /></div>}>
          <TodoForm setPresentDate={setPresentDate} />
          <Todolist presentDate={presentDate} />
        </Suspense>
      </div>}
    </>
  )
}

export default Home