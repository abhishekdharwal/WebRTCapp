import React, { useState } from "react";
import styles from "./StepOtp.module.css";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp);

  async function submit() {
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      dispatch(setAuth({ ...data }));
      // onNext();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the OTP " icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} title="Next" icon="arrow"></Button>
            </div>
            <p className={styles.bottomParagraph}>
              By entering OTP number you agree our Terms and condition !!
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
