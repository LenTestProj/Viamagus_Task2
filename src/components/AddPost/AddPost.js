import React, { useState } from "react";
import classes from "./AddPost.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPost = () => {
  const navigate = useNavigate();

  const [postName, setPostName] = useState("");
  const [postdescription, setPostdescription] = useState("");
  const [inputIsTouched, setIsInputTouched] = useState({
    isNameInputTouched: false,
    isdescriptionInputTouched: false,
  });
  const nameInputHasError =
    postName.length === 0 && inputIsTouched.isNameInputTouched;
  const descriptionInputHasError =
    !(postdescription.length > 0 && postdescription.length < 1000) &&
    inputIsTouched.isdescriptionInputTouched;
  const submitButtonIsActive =
    postName.length > 0 &&
    postdescription.length > 0 &&
    postdescription.length < 1000;

  const AddPost = (event) => {
    event.preventDefault();
    if (submitButtonIsActive) {
      const newPost = {
        title: postName,
        description: postdescription,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/posts", newPost)
        .then((res) => res.data)
        .then(() => {
          console.log("New Post added Successfully");
          alert("New Post added Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log("the error occured is: " + error.message);
          navigate("/404");
        });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.newPostFormContainer}>
        <div className={classes.newPostFormTitle}>
          <p>Add New Post</p>
        </div>
        <form onSubmit={AddPost}>
          <div className={classes.nameSection}>
            <label className={classes.nameText}>Name:</label>
            <div className={classes.nameInput}>
              {nameInputHasError && (
                <p className={classes.error}>Enter a valid name</p>
              )}
              <input
                type="text"
                value={postName}
                className={classes.nameInputField}
                onChange={(event) => setPostName((prev) => event.target.value)}
                onBlur={() =>
                  setIsInputTouched({
                    ...inputIsTouched,
                    isNameInputTouched: true,
                  })
                }
              />
            </div>
          </div>
          <div className={classes.descriptionSection}>
            <label className={classes.descriptionText}>desc:</label>
            <div className={classes.descriptionInput}>
              {descriptionInputHasError && (
                <p className={classes.error}>Enter a valid description</p>
              )}
              <textarea
                type="number"
                value={postdescription}
                className={classes.descriptionInputField}
                minLength={0}
                maxLength={1000}
                onChange={(event) =>
                  setPostdescription((prev) => event.target.value)
                }
                onBlur={() =>
                  setIsInputTouched({
                    ...inputIsTouched,
                    isdescriptionInputTouched: true,
                  })
                }
              ></textarea>
            </div>
          </div>
          <div className={classes.submitButtonSection}>
            <button
              type="submit"
              className={
                classes.submitButton +
                " " +
                (!submitButtonIsActive ? classes.disabled : "")
              }
              disabled={!submitButtonIsActive}
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
