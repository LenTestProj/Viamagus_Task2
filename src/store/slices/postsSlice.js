import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const POSTS_PER_PAGE = 10;
let totalPosts;
let LAST_PAGE;

const initialState = {
  posts: [],
  error: null,
  status: "idle",
  pages: {
    secondPage: 2,
    thirdPage: 3,
    fourthPage: 4,
    currentPage: 1,
    lastPage: null,
  },
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (pageNumberData) => {
    //   const newUrl = POSTS_URL + "?_start=0&_limit=10";
    if (!pageNumberData) {
      return axios
        .get(POSTS_URL)
        .then((res) => {
          const posts = res.data;
          totalPosts = posts.length;
          LAST_PAGE = totalPosts / POSTS_PER_PAGE;
          return {
            posts: posts.slice(0, 10),
          };
        })
        .catch((err) => err.message);
    }
    const {
      currentPage,
      isPrevClicked,
      isNextClicked,
      isLastClicked,
      secondPage,
      thirdPage,
      fourthPage,
    } = pageNumberData;
    console.log(pageNumberData);

    const pagesData = {
      currentPage,
      secondPage,
      thirdPage,
      fourthPage,
    };

    if (isNextClicked) {
      const newSecondPage = pagesData.fourthPage + 1;
      const newThirdPage = pagesData.fourthPage + 2;
      const newFourthPage = pagesData.fourthPage + 3;

      pagesData.currentPage = newSecondPage;
      pagesData.secondPage = newSecondPage;
      pagesData.thirdPage = newSecondPage !== LAST_PAGE ? newThirdPage : null;
      pagesData.fourthPage =
        newThirdPage && newThirdPage !== LAST_PAGE ? newFourthPage : null;
    } else if (isPrevClicked) {
      const newSecondPage = pagesData.secondPage - 3;
      const newThirdPage = pagesData.secondPage - 2;
      const newFourthPage = pagesData.secondPage - 1;

      pagesData.currentPage = newFourthPage;
      pagesData.secondPage = newSecondPage;
      pagesData.thirdPage = newThirdPage;
      pagesData.fourthPage = newFourthPage;
    } else if (isLastClicked) {
      pagesData.currentPage = LAST_PAGE;
      pagesData.secondPage = LAST_PAGE - 2;
      pagesData.thirdPage = LAST_PAGE - 1;
      pagesData.fourthPage = LAST_PAGE;
    } else if (currentPage === 1) {
      pagesData.currentPage = 1;
      pagesData.secondPage = 2;
      pagesData.thirdPage = 3;
      pagesData.fourthPage = 4;
    }

    const newUrl =
      POSTS_URL +
      `?_start=${POSTS_PER_PAGE * currentPage - POSTS_PER_PAGE}&_limit=10`;
    return axios
      .get(newUrl)
      .then((res) => ({
        posts: res.data,
        pagesData: pagesData,
      }))
      .catch((err) => err.message);
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...action.payload.posts];
        state.pages.lastPage = LAST_PAGE;
        if (action.payload.pagesData) {
          state.pages = { ...state.pages, ...action.payload.pagesData };
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
