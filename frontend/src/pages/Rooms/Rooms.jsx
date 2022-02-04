import React, { useState ,useEffect} from "react";
import AddRoomModel from "../../components/AddRoomModel/AddRoomModel";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import { getAllRooms } from "../../http";
const Rooms = () => {
  // const rooms = [
  //   {
  //     id: 1,
  //     topic: "Which framework best for frontend ?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 3,
  //     topic: "What’s new in machine learning?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 4,
  //     topic: "Why people use stack overflow?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 5,
  //     topic: "Artificial inteligence is the future?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Doe",
  //         avatar: "/images/monkey1.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  // ];

  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async ()=>{
       const {data} =await getAllRooms();
       setRooms(data)
    }
    fetchRooms();
  }, []);
  
  function openModal() {
    setShowModal(true);
  }

  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice Rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>

          <div className={styles.right}>
            <button onClick={openModal} className={styles.StartRoomButton}>
              <img src="/images/add-room-icon.png" alt="rooms" />
              <span>Start a room </span>
            </button>
          </div>
        </div>
        <div className={styles.RoomList}>
          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>
      {showModal && <AddRoomModel onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
