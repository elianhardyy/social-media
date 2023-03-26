import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();
  const [myuser, setMyuser] = useState("");
  const userbyname = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/social/${username}`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setMyuser(data);
    } catch (error) {
      console.log(error.message);
    }
    useEffect(() => {
      userbyname();
    }, []);
  };
  return (
    <div>
      <img
        src={"http://localhost:4000/public/" + myuser.profile.photo}
        alt=""
      />
      <h1>{myuser.username}</h1>
    </div>
  );
};

export default User;
