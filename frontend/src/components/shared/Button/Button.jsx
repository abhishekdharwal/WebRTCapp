import React from "react";
import styles from "./Button.module.css";
const Button = ({ title, icon,onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{title}</span>
      <img className={styles.arrow} src={`/images/${icon}.png`} alt="arrow" />
    </button>
  );
};

export default Button;
