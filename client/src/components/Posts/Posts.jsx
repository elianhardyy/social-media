import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import "./Posts.scss";
import { request } from "../../axios";
import { useRouteError } from "react-router-dom";
const Posts = ({ user }) => {
  //TEMPORARY
  const URL = "http://localhost:4000";
  const [posts, setPosts] = useState([]);
  const allPosts = async () => {
    const response = await fetch(`${URL}/posts/all/posts`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
    //setPosts(data);
  };
  const { isLoading, error, data } = useQuery(["posts"], allPosts);
  console.log(data);
  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} user={user} />)}
    </div>
  );
};

export default Posts;
