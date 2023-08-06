import React, { useState } from "react";
import bg from "../../img/bg-profile.jpg";
import CloudUpload from "@mui/icons-material/CloudUpload";
import profile from "../../img/userprofile.png";
import "./Update.scss";
const Update = ({ user, setOpenUpdate }) => {
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form action="">
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={bg} alt="" />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input
              type="file"
              name=""
              id="cover"
              style={{ display: "none" }}
              onChange
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    user.profile.photo != undefined
                      ? "http://localhost:4000/public/" + user.profile.photo
                      : profile
                  }
                  alt=""
                />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input
              type="file"
              name=""
              id="profile"
              style={{ display: "none" }}
              onChange
            />
            <button>Update</button>
          </div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" value={user.email} onChange />
          <label htmlFor="">Username</label>
          <input type="text" name="username" value={user.username} onChange />
          <label htmlFor="">First Name</label>
          <input type="text" name="firstname" value={user.firstname} onChange />
          <label htmlFor="">Last Name</label>
          <input type="text" name="lastname" value={user.lastname} onChange />
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
