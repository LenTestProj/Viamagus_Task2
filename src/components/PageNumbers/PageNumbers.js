import React from "react";
import "./PageNumber.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/slices/postsSlice";
import { Link } from "react-router-dom";

const PageNumbers = () => {
  const dispatch = useDispatch();
  const { secondPage, thirdPage, fourthPage, currentPage, lastPage } =
    useSelector((state) => state.posts.pages);

  const selectedPage = (event) => {
    console.log(event.target.textContent);

    if (
      event.target.textContent !== "Prev" &&
      event.target.textContent !== "Next" &&
      event.target.textContent !== "Last"
    ) {
      dispatch(
        fetchPosts({
          currentPage: Number(event.target.textContent),
          isPrevClicked: false,
          isNextClicked: false,
          isLastClicked: false,
          secondPage,
          thirdPage,
          fourthPage,
        })
      );
    } else if (event.target.textContent === "Prev") {
      dispatch(
        fetchPosts({
          isPrevClicked: true,
          isNextClicked: false,
          isLastClicked: false,
          secondPage,
          thirdPage,
          fourthPage,
          currentPage: secondPage - 1,
        })
      );
    } else if (event.target.textContent === "Next") {
      dispatch(
        fetchPosts({
          isPrevClicked: false,
          isNextClicked: true,
          isLastClicked: false,
          secondPage,
          thirdPage,
          fourthPage,
          currentPage: fourthPage + 1,
        })
      );
    } else if (event.target.textContent === "Last") {
      dispatch(
        fetchPosts({
          isPrevClicked: false,
          isNextClicked: false,
          isLastClicked: true,
          secondPage,
          thirdPage,
          fourthPage,
          currentPage: lastPage,
        })
      );
    }
  };

  const isPrevEnabled = secondPage !== 2 && thirdPage !== 3 && fourthPage !== 4;

  const isNextEnabled =
    secondPage !== lastPage &&
    thirdPage !== lastPage &&
    fourthPage !== lastPage;

  return (
    <div className="pageNumberContainer">
      <div onClick={selectedPage} className="pageNumberSection">
        <Link
          to={`/posts?pageNumber=1`}
          className={`pageNumberButtons ${
            currentPage === 1 ? "currentButton" : ""
          }`}
        >
          1
        </Link>
        {isPrevEnabled && (
          <Link
            className="pageNumberButtons"
            to={`/posts?pageNumber=${secondPage - 1}`}
          >
            Prev
          </Link>
        )}
        <Link
          to={`/posts?pageNumber=${secondPage}`}
          className={`pageNumberButtons ${
            currentPage === secondPage ? "currentButton" : ""
          }`}
        >
          {secondPage}
        </Link>
        <Link
          to={`/posts?pageNumber=${thirdPage}`}
          className={`pageNumberButtons ${
            currentPage === thirdPage ? "currentButton" : ""
          }`}
        >
          {thirdPage}
        </Link>
        <Link
          to={`/posts?pageNumber=${fourthPage}`}
          className={`pageNumberButtons ${
            currentPage === fourthPage ? "currentButton" : ""
          }`}
        >
          {fourthPage}
        </Link>
        {isNextEnabled && (
          <Link
            className="pageNumberButtons"
            to={`/posts?pageNumber=${fourthPage + 1}`}
          >
            Next
          </Link>
        )}
        {isNextEnabled && (
          <Link
            className="pageNumberButtons"
            to={`/posts?pageNumber=${lastPage}`}
          >
            Last
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageNumbers;
