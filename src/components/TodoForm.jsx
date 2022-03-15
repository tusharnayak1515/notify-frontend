import React from 'react';
import Button from '../UI/Button';

import styles from './todoform.module.css';

const TodoForm = () => {
  return (
    <div className={styles.todoform}>
        <input type="text" placeholder='Enter your todo' />
        <Button>Add Todo</Button>
    </div>
  )
}

export default TodoForm