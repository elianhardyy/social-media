import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { request, requestfile } from "../../axios";
import Background from "./bg-profile.jpg";
import profile from "../../img/userprofile.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import Place from "@mui/icons-material/Place";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import FacebookTwoTone from "@mui/icons-material/FacebookTwoTone";
import "./Profile.scss";
import Update from "../../components/Update/Update";
const Profile = ({ user }) => {
  const { name } = useParams();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [file, setFile] = useState(null);
  console.log(file);
  const URL = "http://localhost:4000";
  const userSingle = async () => {
    try {
      const response = await fetch(`${URL}/users/social/${name}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const uploadProfilePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await requestfile.post("/profiles/photo", formData);

      return response.data;
    } catch (error) {
      console.log(error);
    }
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
  const { isLoading, error, data } = useQuery(["users"], userSingle);
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
  const uploadFile = async (e) => {
    e.preventDefault();
    await uploadProfilePhoto();

    setFile(null);
  };
  console.log(data);
  return (
    <div className="profile">
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="images">
            <img src={Background} alt="" className="cover" />
            <img
              src={
                user.profile != undefined
                  ? "http://localhost:4000/public/" + user.profile.photo
                  : profile
              }
              alt=""
              style={{ width: "100px" }}
              className="profilePicture"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http//facebook.com">
                  <FacebookTwoTone fontSize="large" />
                </a>
                <a href="http//twitter.com">
                  <TwitterIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.firstname}</span>
                <div className="follower">{flwrData.length} Followers</div>
                <div className="follower">{flwingData.length} Following</div>
                <div className="info">
                  <div className="item">
                    <Place />
                    <span>{user.username}</span>
                  </div>
                </div>
                {fIsLoading ? (
                  "loading"
                ) : name === user.username ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button>
                    {flwrData.includes(user.id) ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlined />
              </div>
            </div>
          </div>
        </>
      )}
      {user.profile != undefined ? (
        openUpdate && <Update user={data} setOpenUpdate={setOpenUpdate} />
      ) : (
        <>
          <input
            type="file"
            name="file"
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={uploadFile}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Profile;
