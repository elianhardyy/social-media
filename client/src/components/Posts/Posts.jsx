import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import "./Posts.scss";
import { request } from "../../axios";
const Posts = () => {
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
  // useEffect(() => {
  //   allPosts();
  // }, []);
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
