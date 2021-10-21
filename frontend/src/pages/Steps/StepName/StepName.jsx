import React, { useState } from "react";
import styles from "./StepName.module.css";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);

  const dispatch = useDispatch();
  function nextStep() {
    if (!fullName) {
      return;
    } else {
      dispatch(setName(fullName));
      onNext();
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter Your Name " icon="user-face">
          <TextInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div>
            <p className={styles.bottomParagraph}>
              People use real name at GiG
            </p>
            <div className={styles.actionButtonWrap}>
              <Button onClick={nextStep} title="Next" icon="arrow"></Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepName;
