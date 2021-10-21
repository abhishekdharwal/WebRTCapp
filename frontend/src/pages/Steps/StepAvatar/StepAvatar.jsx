import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const StepAvtar = ({ nextStep }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey1.png");
  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      console.log("hlelel");
      console.log(data);
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log('the',err);
    }
  }
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Hola,${name}`} icon="monkey">
          <p className={styles.subHeading}>How's this Photo</p>
          <div>
            <img className={styles.avatarWrapper} src={image} alt=" "></img>
          </div>
          <div>
            <input
              onChange={captureImage}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label className={styles.avatarLabel} htmlFor="avatarInput">
              Upload Photo
            </label>
          </div>
          <Button onClick={submit} title="Next" icon="arrow"></Button>
        </Card>
      </div>
    </>
  );
};

export default StepAvtar;
