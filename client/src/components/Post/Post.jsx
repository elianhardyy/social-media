import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { useState } from "react";
import moment from "moment";
import profile from "../../img/userprofile.png";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { request } from "../../axios";
const Post = ({ post, user }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  //console.log(post.comment);
  //GET LIKE BY SINGLE POST
  const getLikeBySinglePost = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/posts/get/like/" + post.id,
        {
          credentials: "include",
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading, error } = useQuery(
    ["likes", post.id],
    getLikeBySinglePost
  );
  //POST LIKE
  const postLike = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/posts/like/" + post.id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE LIKE
  const deleteLike = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/posts/delete/like/" + post.id,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (liked) return request.delete("/posts/delete/like/" + post.id);
      return request.post("/posts/like/" + post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("likes");
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return request.delete("/posts/delete/post/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  // const handleLike = () => {
  //   mutation.mutate(data.includes(user.id));
  // };
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.users.profile != undefined
                  ? "http://localhost:4000/public/" + post.users.profile.photo
                  : profile
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/social/${post.users.firstname}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* <span className="name">{post.users.firtsname}</span> */}
                <span className="name">{post.users.username}</span>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.users.id === user.id && (
            <button className="delete-post" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
        <div className="content">
          <p>{post.caption}</p>
          <img src={"http://localhost:4000/public/" + post.image} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
            {/* {isLoading ? (
              "loading"
            ) : data.includes(user.id) ? (
              <FavoriteOutlinedIcon onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes */}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comment.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments commentuser={post.id} user={user} />}
      </div>
    </div>
  );
};

export default Post;
