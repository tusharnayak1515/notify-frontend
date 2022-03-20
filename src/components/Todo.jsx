import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarker, faTrash } from "@fortawesome/free-solid-svg-icons";
import { actionCreators } from "../redux";

import styles from "./todo.module.css";
import TodoForm from "./TodoForm";

const Todo = ({ todo }) => {
  const [color, setColor] = React.useState("");
  const [isComplete, setIsComplete] = React.useState(false);
  const textstyle = { color: color };
  const [edit, setEdit] = useState({
    _id: null,
    text: "",
    date: null,
    isComplete: false,
  });

  const dispatch = useDispatch();

  const onComplete = () => {
    dispatch(actionCreators.completeTodo(todo._id));
    setIsComplete(complete=> !complete);
  };

  const onEdit = () => {
    setEdit({
      _id: todo._id,
      text: todo.text,
      date: todo.date,
      isComplete: todo.isComplete,
    });
  };

  const onDelete = () => {
    dispatch(actionCreators.deleteTodo(todo._id));
  };

  if (edit._id) {
    return <TodoForm edit={edit} setEdit={setEdit} />;
  }

  return (
    <div
      className={styles.todo}
      style={{ backgroundColor: isComplete ? "" : "rgb(209, 208, 208)" }}
    >
      <FontAwesomeIcon
        icon={faMarker}
        onClick={onEdit}
        style={{ cursor: "pointer" }}
        className={styles.edit}
      />
      <h2
        onClick={onComplete}
        style={textstyle}
        onMouseEnter={() => !todo.isComplete ? setColor("rgb(207, 126, 126)") : setColor("red")}
        onMouseLeave={() => setColor("")}
      >
        {todo.text}
      </h2>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={onDelete}
        style={{ cursor: "pointer" }}
        className={styles.delete}
      />
      {/* <h3>{todo.date}</h3> */}
    </div>
  );
};

export default Todo;
