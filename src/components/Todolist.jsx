import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux";
import Todo from "./Todo";

import styles from "./todolist.module.css";

const Todolist = ({presentDate}) => {
  const dispatch = useDispatch();
  const [noTodos, setNoTodos] = useState(false);
  const todos = useSelector((state) => state.todoReducer.todos);
  const token = useSelector((state) => state.userReducer.user);

  const orderedTodos = [...todos].reverse();

  useEffect(() => {
    if (token) {
      dispatch(actionCreators.fetchAlltodos());
      if (todos.filter((todo)=> presentDate === todo.date ? todo : null).length === 0) {
        setNoTodos(true);
      } else {
        setNoTodos(false);
      }
    }
  }, [token, todos, dispatch, presentDate]);

  return (
    <div>
      <h1 className={styles.header}>My Todos</h1>
      {orderedTodos && noTodos ? (
        <h1 className={styles.notodos}>No todos to display!</h1>
      ) : (
        <div
          className={styles.todolist}
        >
          {orderedTodos &&
            orderedTodos.map((todo) => {
              if(presentDate === todo.date) {
                return <Todo key={todo._id} todo={todo} />;
              }
              else {
                return null;
              }
            })}
        </div>

      )}
    </div>
  );
};

export default Todolist;
