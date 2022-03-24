import React from "react";
import reactDom from "react-dom";

import styles from "./modal.module.css";
import TodoForm from "./TodoForm";

const Modal = ({ show, setShow, edit, setEdit }) => {
  if (!show) {
    return null;
  }
  return reactDom.createPortal(
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <h1>Edit Todo</h1>
        <TodoForm edit={edit} setEdit={setEdit} setShow={setShow} />
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
