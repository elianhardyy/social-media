import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import "./Comments.scss";
import moment from "moment";
import { request } from "../../axios";
import profile from "../../img/userprofile.png";
const Comments = ({ commentuser, user }) => {
  const [comment, setDesc] = useState("");
  //const { data, status } = useQuery(["comments"]);
  const getComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/posts/comments/get/" + commentuser,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const queryClient = useQueryClient();
  const { status, data } = useQuery(["comments"], getComment);
  console.log(data);
  console.log(status);
  const mutation = useMutation(
    (newComment) => {
      return request.post("/posts/comment/" + commentuser, newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const commentSubmit = async (e) => {
    e.preventDefault();
    //commentPost();
    mutation.mutate({ comment });
    setDesc("");
  };
  if (status === "loading") {
    return <p>Loading cok</p>;
  }
  if (status == "error") {
    return <p>Error ngab wes turuo</p>;
  }
  return (
    <div className="comments">
      {/* authenticate post */}
      <div className="write">
        <img
          src={
            user.profile != undefined
              ? "http://localhost:4000/public/" + user.profile.photo
              : profile
          }
          alt="haha"
        />
        <input
          type="text"
          placeholder="write a comment"
          value={comment}
          name="comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        {/* <h1>{commentuser.id}</h1> */}
        <button onClick={commentSubmit}>Send</button>
      </div>
      {/* public comment */}

      {data.map((comment) => (
        <div className="comment">
          <img
            src={
              comment.user.profile != undefined
                ? "http://localhost:4000/public/" + comment.user.profile.photo
                : profile
            }
            alt=""
          />
          <div className="info">
            <span>{comment.user.username}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{moment(comment.created_at).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
