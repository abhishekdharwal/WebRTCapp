import React, { useState } from "react";
import styles from "./Email.module.css";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
const Email = ({onNext}) => {
  const [email, setEmail] = useState(" ");
  return (
    <Card title="Enter Your Email Id" icon="email">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onNext} title="Next" icon="arrow"></Button>
        </div>
        <p className={styles.bottomParagraph}>
          By entering phone number you agree our Terms and condition !!
        </p>
      </div>
    </Card>
  );
};

export default Email;
