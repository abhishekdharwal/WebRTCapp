import React, { useState } from "react";
import styles from "./Phone.module.css";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState(" ");
  const dispatch = useDispatch();

  async function submit() {
    if (!phoneNumber) return;
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }
  return (
    <Card title="Enter Your Phone Number" icon="Emoji">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} title="Next" icon="arrow"></Button>
        </div>
        <p className={styles.bottomParagraph}>
          By entering phone number you agree our Terms and condition !!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
