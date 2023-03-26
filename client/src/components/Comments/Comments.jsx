import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import "./Comments.scss";
const Comments = ({ commentuser }) => {
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  const [desc, setDesc] = useState("");
  //const { data, status } = useQuery(["comments"]);
  const URL = "http://localhost:4000/posts/comment/" + commentuser.id;
  const commentPost = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({ desc }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(commentPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
  const commentSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ desc });
    setDesc("");
  };
  return (
    <div className="comments">
      {/* authenticate comment */}
      <div className="write">
        <img
          src={
            "http://localhost:4000/public/" + commentuser.users.profile.photo
          }
          alt="haha"
        />
        <input
          type="text"
          name="comment"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        {/* <h1>{commentuser.id}</h1> */}
        <button onClick={commentSubmit}>Send</button>
      </div>
      {/* public comment */}
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
