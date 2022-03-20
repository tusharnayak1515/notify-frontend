import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux";
import Todo from "./Todo";

import styles from "./todolist.module.css";

const Todolist = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);
  const token = useSelector((state) => state.userReducer.user);
  
  useEffect(() => {
    if (token) {
      dispatch(actionCreators.fetchAlltodos());
    }
  }, [token, todos, dispatch]);

  const orderedTodos = [...todos].reverse();

  return (
    <div className={styles.todolist}>
      {orderedTodos && orderedTodos.length === 0 ? (
        <h1 className={styles.notodos}>No todos to display!</h1>
      ) : (
        orderedTodos &&
        orderedTodos.map((todo) => {
          return <Todo key={todo._id} todo={todo} />
        })
      )}
    </div>
  );
};

export default Todolist;
