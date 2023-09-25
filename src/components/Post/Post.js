import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  return (
    <div className="postItemContainer">
      <p className="postItemTitle">{post.title}</p>
      <section className="postItemMiniSection">
        <p style={{ fontSize: "1.2rem" }}>Id: {post.id}</p>
        <Link to={`/post/${post.id}`} className="postItemLink">
          {" "}
          View Post
        </Link>
      </section>
    </div>
  );
};

export default Post;
