import React from "react";
import styles from "./Navigation.module.css";
//  css is exported as default so we can name styles
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
// import { setAuth } from "../../../store/authSlice";
export const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  // children inside the module cannot be applid with nav css so we made our inline css
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    // this is the way to include two syles one from nav css and another from global
    <nav className={`${styles.navbar} container`}>
      <Link to="/" style={brandStyle}>
        <img src="./images/logo.png" alt="logo" />
        <span style={logoText}>Coderhouse</span>
      </Link>
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};
