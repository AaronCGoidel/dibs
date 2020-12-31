import React from "react";
import styles from "../styles/button.module.css";

const CardButton = (props) => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

export default CardButton;
