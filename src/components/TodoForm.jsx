import React, { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux";
import Button from "../UI/Button";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import styles from "./todoform.module.css";

const TodoForm = ({ edit, setEdit }) => {
  const [input, setInput] = useState(edit ? edit.text : "");
  const dispatch = useDispatch();
  const currentDate = new Date();

  const defaultValue = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  const [startDate, setStartDate] = useState(defaultValue);

  const customDate = `${startDate.day}/${startDate.month}/${startDate.year}`;

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    dispatch(actionCreators.addTodo(input, customDate));
    setInput("");
  };

  const onEditSubmit = () => {
    dispatch(actionCreators.editTodo(edit._id, input, edit.date));
    setInput("");
    setEdit({
      _id: null,
      text: "",
      date: null,
      isComplete: false
    })
  }

  return (
    <>
      {!edit ? (
        <>
          <div className={styles.calender}>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              inputPlaceholder="Select a day"
              shouldHighlightWeekends
            />
          </div>
          <div className={styles.todoform}>
            <input
              type="text"
              placeholder="Enter your todo"
              value={input}
              onChange={onChangeHandler}
            />
            <Button onClick={onSubmit}>Add Todo</Button>
          </div>
        </>
      ) : (
        <>
          <div style={{ position: edit && 'relative', width: edit && '50vw', justifyContent: edit && 'flex-start' }} className={styles.todoform}>
            <input
              type="text"
              placeholder="Enter your todo"
              value={input}
              onChange={onChangeHandler}
              style={{ margin: edit && '0 1vh' }}
            />
            <Button onClick={onEditSubmit}>Edit Todo</Button>
          </div>
        </>
      )}
    </>
  );
};

export default TodoForm;
