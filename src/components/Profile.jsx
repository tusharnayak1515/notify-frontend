import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import Button from '../UI/Button';
import Todo from "./Todo";

import styles from './profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todos = useSelector(state => state.todoReducer.todos);
    const user = useSelector(state => state.userReducer.profile);
    const token = useSelector((state) => state.userReducer.user);

    const deleteUser = () => {
        return dispatch(actionCreators.deleteuser(user._id));
    }

    const orderedTodos = todos && [...todos].reverse();

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        }
        if (token) {
            dispatch(actionCreators.profile());
            dispatch(actionCreators.fetchAlltodos());
        }
    }, [dispatch, token, navigate]);

    return (
        <div className={styles.profile}>
            <div className={styles.userDetails}>
                <h1 className={styles.name}>{user.name}</h1>
                <h1 className={styles.username}>@{user.username}</h1>
                <h1 className={styles.email}>{user.email}</h1>
            </div>
            {/* <h1>Todos: {user && user.todos.length}</h1> */}
            <h1 className={styles.todoHead}>My Todos</h1>
            <div className={styles.todos}>
                {orderedTodos.map((todo) => {
                    return <Todo profile={true} key={todo._id} todo={todo} />
                })}
            </div>
            <Button bg='red' onClick={deleteUser}>Delete Account</Button>
        </div>
    )
}

export default Profile