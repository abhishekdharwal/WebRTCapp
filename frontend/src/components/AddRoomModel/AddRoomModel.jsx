import React, { useState } from "react";
import styles from "./AddRoomModel.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http/index";
import { useHistory } from "react-router-dom";

const AddRoomModel = ({ onClose }) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  async function createRoom() {
    //// server call
    try {
      if (!topic) {
        return;
      }
      const { data } = await create({ topic, roomType });
      history.push(`/room/${data.id}`);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.ModalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="./images/close.png" alt="Close" />
        </button>

        <div className={styles.ModalHeader}>
          <h3 className={styles.heading}> Enter to topic to be disscussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room Type</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="./images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="./images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="./images/lock1.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>

        <div className={styles.ModalFooter}>
          <h2> Start a room , open to everyone! </h2>
          <button onClick={createRoom} className={styles.Addroombutton}>
            <img src="./images/celebration.png" alt="cele" />
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
