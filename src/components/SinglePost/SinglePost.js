import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePost.css";
import axios from "axios";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const fetchedPost = await response.data;
      setPost(fetchedPost);
    };
    fetchPost();
  }, []);

  if (!post) {
    return (
      <div>
        <h2>Post Not Found</h2>
      </div>
    );
  }
  return (
    <div style={{ paddingTop: "2rem" }}>
      <div className="singlePostContainer">
        <h4 className="singlePostTitle">{post.title}</h4>
        <p className="singlePostBody">{post.body}</p>
      </div>
    </div>
  );
};

export default SinglePost;
