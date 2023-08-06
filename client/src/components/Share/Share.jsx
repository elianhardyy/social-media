import React, { useState } from "react";
import Friend from "../../img/friend.png";
import Map from "../../img/map.png";
import Img from "../../img/img.png";
import "./Share.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, requestfile } from "../../axios";
import profile from "../../img/userprofile.png";
import EmojiPicker from "emoji-picker-react";
const Share = ({ user }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  console.log(file);

  //const URL = "http://localhost:4000/posts";
  // const upload = async () => {
  //   formData.append("file", file);
  //   formData.append("caption", caption);
  //   try {
  //     const response = await fetch("http://localhost:4000/posts/image", {
  //       method: "POST",
  //       body: formData,
  //       // headers: {
  //       //   "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
  //       // },
  //       credentials: "include",
  //     });
  //     return response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", file);
      const response = await requestfile.post("/posts/image", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newCaption) => {
      return request.post("/posts/caption", newCaption);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const uploadFile = async (e) => {
    e.preventDefault();
    let fileUrl = "";
    if (file) fileUrl = await upload();
    mutation.mutate({ caption, file: fileUrl });
    //upload();
    //mutation.mutate({ caption, file });
    setCaption("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={
              user.profile != undefined
                ? "http://localhost:4000/public/" + user.profile.photo
                : profile
            }
            alt="profile photo"
          />
          <input
            type="text"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            placeholder={`What's in your mind ${user.firstname} ${user.lastname}`}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Img} alt="image" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="image" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="image" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={uploadFile}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
