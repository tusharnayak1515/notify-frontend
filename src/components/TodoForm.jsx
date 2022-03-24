import React, { useEffect, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux";
import Button from "../UI/Button";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import styles from "./todoform.module.css";

const TodoForm = ({ edit, setEdit, setShow, setPresentDate }) => {
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useState(edit ? edit.text : "");
  const error = useSelector((state) => state.todoReducer.error);
  const todos = useSelector((state) => state.todoReducer.todos);
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
    const trimmedInput = input.replace(/ /g,'');
    if(trimmedInput.length >= 5) {
      dispatch(actionCreators.editTodo(edit._id, input, edit.date));
      setInput("");
      setEdit({
        _id: null,
        text: "",
        date: null,
        isComplete: false
      });
      setShow(false);
    }
    else {
      dispatch(actionCreators.editTodo(edit._id, input, edit.date));
      setIsError(true);
    }
  }

  useEffect(()=> {
    if(error) {
      setIsError(true);
    }
    else {
      setIsError(false);
    }
    return ()=> {
      localStorage.removeItem("error");
      setIsError(false);
    }
  },[error,todos]);

  return (
    <>
      {!edit ? (
        <>
          <div className={styles.calender}>
            <DatePicker
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                setPresentDate(`${date.day}/${date.month}/${date.year}`);
              }}
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
            <Button bg='rgb(11, 117, 11)' onClick={onSubmit}>Add Todo</Button>
          </div>
          {/* {isError && <div className={styles.error}><p>{error}</p></div>} */}
        </>
      ) : (
        <>
          <div style={{ position: 'relative', left: '1%', width: '50vw', justifyContent: 'flex-start' }} className={styles.todoform}>
            <input
              type="text"
              placeholder="Enter your todo"
              value={input}
              onChange={onChangeHandler}
              style={{ margin: '0 1.5vw' }}
            />
            <Button onClick={onEditSubmit}>Edit Todo</Button>
            <Button onClick={() => {
              dispatch(actionCreators.editTodo(edit._id, edit.text, edit.date));
              setInput("");
              setEdit({
                _id: null,
                text: "",
                date: null,
                isComplete: false
              });
              setShow(false);
            }}>
              Cancel
            </Button>
          </div>
        </>
      )}
      {isError && <div className={styles.error}><p>{error}</p></div>}
    </>
  );
};

export default TodoForm;
