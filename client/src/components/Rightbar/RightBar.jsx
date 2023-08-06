import React, { useEffect, useState } from "react";
import "./Right.scss";
import { useQuery } from "@tanstack/react-query";
//import "./Loh.css";
import profile from "../../img/userprofile.png";
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
      console.log(data);
    } catch (error) {
      consonle.log(error.message);
    }
  };
  console.log(follow);
  const followUser = async () => {
    try {
      await fetch(`http://localhost:4000/relation/follow/${follow.id}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {}
  };
  const follower = async () => {
    try {
      const follower = await fetch(`${URL}/relation/follower`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      return follower.json();
    } catch (error) {
      console.log(error);
    }
  };
  const following = async () => {
    try {
      const follower = await fetch(`${URL}/relation/following`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      return follower.json();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    isLoading: fIsLoading,
    error: errFlwr,
    data: flwrData,
  } = useQuery(["followers"], follower);
  const {
    isLoading: fingIsLoading,
    error: errFlwing,
    data: flwingData,
  } = useQuery(["following"], following);
  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestion</span>
          {users.map((user) =>
            user.id != follow.id ? (
              <div className="user">
                <div className="userInfo">
                  <img
                    src={
                      user.profile != undefined
                        ? "http://localhost:4000/public/" + user.profile.photo
                        : profile
                    }
                    alt=""
                  />
                  <span>{user.username}</span>
                </div>
                <div className="buttons">
                  <button>Follow</button>
                  <button>Dismiss</button>
                </div>
              </div>
            ) : (
              <div className="blank"></div>
            )
          )}
          {users.map((p) => {
            p.follower.map((f) => {
              console.log("from find all" + f.id);
              follow.follower.map((f) => {
                console.log("from login" + f.id);
              });
            });
          })}
          {/* {follow.follower.map((f) => {
            console.log("from login" + f.id);
          })} */}
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
