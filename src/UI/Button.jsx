import React from 'react';

import styles from './button.module.css';

const Button = (props) => {
  return (
    <button style={{backgroundColor: props.bg ? props.bg : 'rgb(108, 0, 197)'}} className={styles.btn} onClick={props.onClick} >
      {props.children}
    </button>
  )
}

export default Button