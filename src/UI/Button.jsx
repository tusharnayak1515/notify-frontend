import React, { useState } from "react";

import styles from "./button.module.css";

const Button = (props) => {
  // const [bg,setBg] = useState(props.bg ? props.bg : "rgb(108, 0, 197)");
  const [bg,setBg] = useState(props.bg ? props.bg : "green");
  const [opacity,setOpacity] = useState("1");
  return (
    <button
      style={{ backgroundColor: bg, opacity: opacity }}
      className={styles.btn}
      onClick={props.onClick}
      onMouseEnter={() => {
        props.bg === 'red' ? setBg("rgb(221, 33, 33)") : (props.bg === 'rgb(11, 117, 11)' ? setBg("rgb(23, 177, 23)") : setOpacity("0.85"));
      }}
      onMouseLeave={() => {props.bg === 'red' ? setBg('red') : (props.bg === 'rgb(11, 117, 11)' ? setBg("green") : setOpacity("1"))}}
    >
      {props.children}
    </button>
  );
};

export default Button;
