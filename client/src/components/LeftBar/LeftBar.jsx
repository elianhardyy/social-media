import React, { useState } from "react";
import friends from "../../img/add-friend.png";
import groups from "../../img/group.png";
import marketplace from "../../img/marketplace.png";
import watch from "../../img/watch.png";
import users from "../../img/user.png";
import messages from "../../img/messages.png";
import "./LeftBar.scss";
import { Link } from "react-router-dom";
const Leftbar = ({ user }) => {
  const [click, setClick] = useState(false);
  async function logout() {
    await fetch("http://localhost:4000/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    localStorage.removeItem("token");
    //setUser("");
  }
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={users} />
            <span>{user.firstname + "" + user.lastname}</span>
          </div>
          <div className="item">
            <img src={friends} />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={groups} />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={marketplace} />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={watch} />
            <span>Watch</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Shortcuts</span>
          <div className="item">
            <img src={messages} />
            <span>Messages</span>
          </div>
          <Link
            to="/login"
            onClick={() => {
              setClick(logout);
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
