import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarker, faTrash } from "@fortawesome/free-solid-svg-icons";
import { actionCreators } from "../redux";
import Modal from "./Modal";

import styles from "./todo.module.css";

const Todo = ({ todo, profile }) => {
  const [edit, setEdit] = useState({
    _id: null,
    text: "",
    date: null,
    isComplete: false,
  });

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const onComplete = () => {
    dispatch(actionCreators.completeTodo(todo._id));
  };

  const onEdit = () => {
    setEdit({
      _id: todo._id,
      text: todo.text,
      date: todo.date,
      isComplete: todo.isComplete,
    });
    setShow(true);
  };

  const onDelete = () => {
    dispatch(actionCreators.deleteTodo(todo._id));
  };

  if (edit._id) {
    return (
      <Modal show={show} setShow={setShow} edit={edit} setEdit={setEdit} />
    );
  }

  return (
    <>
      {profile===undefined ? (
        <div
          className={styles.todo}
          style={{
            backgroundColor: todo.isComplete ? "" : "rgb(209, 208, 208)",
            opacity: todo.isComplete ? "0.5" : "1"
          }}
        >
          <FontAwesomeIcon
            icon={faMarker}
            onClick={onEdit}
            style={{
              cursor: "pointer",
              pointerEvents: todo.isComplete ? "none" : "all",
            }}
            className={styles.edit}
          />
          <h2
            onClick={onComplete}
            className={
              todo.isComplete ? styles.completedTodo : styles.normalTodo
            }
          >
            {todo.text}
          </h2>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={onDelete}
            style={{
              cursor: "pointer",
              pointerEvents: todo.isComplete ? "none" : "all",
            }}
            className={styles.delete}
          />
          {/* <h3>{todo.date}</h3> */}
        </div>
      ) : (
        <div
          className={styles.todo}
          style={{
            backgroundColor: todo.isComplete ? "" : "rgb(209, 208, 208)",
            opacity: todo.isComplete ? "0.6" : "1"
          }}
        >
          <FontAwesomeIcon
            icon={faMarker}
            onClick={onEdit}
            style={{
              cursor: "pointer",
              pointerEvents: todo.isComplete ? "none" : "all",
            }}
            className={styles.edit}
          />
          <h2
            onClick={onComplete}
            className={
              todo.isComplete ? styles.completedTodo : styles.normalTodo
            }
          >
            {`${todo.text}-----${todo.date}`}
          </h2>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={onDelete}
            style={{
              cursor: "pointer",
              pointerEvents: todo.isComplete ? "none" : "all",
            }}
            className={styles.delete}
          />
        </div>
      )}
    </>
  );
};

export default Todo;
