import React, { useEffect, useState } from "react";
import "./Right.scss";
//import "./Loh.css";
import profile from "../../img/images.jpg";
const RightBar = ({ follow }) => {
  const [users, setUsers] = useState([]);
  const getAllusers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/find/all/users",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      consonle.log(error.message);
    }
  };
  const followUser = async () => {
    try {
      await fetch(`http://localhost:4000/relation/follow/${follow.id}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {}
  };
  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestion</span>
          {users.map((user) => (
            <div className="user">
              <div className="userInfo">
                <img src={profile} alt="" />
                <span>{user.username}</span>
              </div>
              <div className="buttons">
                <button>Follow</button>
                <button>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className="item">
          <span>Notification</span>
          <div className="user">
            <div className="userInfo">
              <img src={profile} alt="" />
              <span>Jane Doe</span>
              <p>changed their cover picture</p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
