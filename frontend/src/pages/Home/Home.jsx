import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

export const Home = () => {
  // history hook used to redirect
  const history = useHistory();
  function startRegister() {
    history.push("/authenticate");
    console.log("clicled");
  }
  // const signInLink = {
  //   color: "#0077ff",
  //   fontWeight: "bold",
  //   textDecoration: "none",
  //   marginLeft: "10px",
  // };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Codehouse !!!" icon="logo">
        <p className={styles.text}>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum
        </p>
        <div>
          <Button onClick={startRegister} title="Lets Go" icon="arrow"></Button>
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite</span>
        </div>
      </Card>
    </div>
  );
};
