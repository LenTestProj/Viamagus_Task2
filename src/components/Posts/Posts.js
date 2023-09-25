import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Post from "../Post/Post";
import "./Posts.css";
import PageNumbers from "../PageNumbers/PageNumbers";
import { useLocation, useParams } from "react-router-dom";
import { fetchPosts } from "../../store/slices/postsSlice";

const Posts = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (location.search.length > 0) {
      const currentPage = location.search.split("=")[1];
      console.log("The current page is: " + currentPage);
    } else {
      dispatch(
        fetchPosts({
          currentPage: 1,
          isPrevClicked: false,
          isNextClicked: false,
          isLastClicked: false,
          secondPage: 2,
          thirdPage: 3,
          fourthPage: 4,
        })
      );
    }
  }, [location.search.length]);

  if (postStatus === "loading") {
    return <LoadingSpinner />;
  }
  if (postStatus === "failed") {
    return <p>{postError}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
      }}
    >
      <h2>Posts</h2>
      <ul className="list">
        {posts.map((post, i) => (
          <li key={i}>
            <Post post={post} />
          </li>
        ))}
      </ul>
      <PageNumbers />
    </div>
  );
};

export default Posts;
Posts;
