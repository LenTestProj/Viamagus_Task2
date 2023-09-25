import React, { useEffect } from "react";
import PostsPage from "./pages/PostsPage";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./components/SinglePost/SinglePost";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./store/slices/postsSlice";
import Navbar from "./components/Navbar/Navbar";
import AddPost from "./components/AddPost/AddPost";
import ErrorPage from "./ErrorPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
