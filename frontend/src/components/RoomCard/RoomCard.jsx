import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./RoomCard.module.css";
const RoomCard = ({ room }) => {
  const history = useHistory()
  return (
    <div onClick={()=>{history.push(`/room/${room.id}`)}} className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakers} ${room.speakers.length===1 ? styles.single : ''}`}>
        <div className={styles.avatar}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker-avater" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className={styles.nameswrapper}>
              <span>
                {speaker.name}
                <img src="./images/chat-bubble.png" alt="chat bubble" />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="./images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
