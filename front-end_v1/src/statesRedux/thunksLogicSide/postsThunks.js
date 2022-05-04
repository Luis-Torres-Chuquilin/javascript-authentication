/** @format */

import axios from "axios";

import {
  // Load Actions
  loadPostsSuccess,
  loadPostsInProgress,
  loadPostsFailure,

  // Create , Update , Remove
  addPost,
  updatePost,
  // removePost,
} from "../actions/postActions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadPostsInProgress());
    const response = await axios.get("/api/allPosts");
    const posts = response.data;
    // const { data } = await axios.get("/api/allPosts");
    // const posts = data
    dispatch(loadPostsSuccess(posts)); // dispatch actions indirectly
  } catch (err) {
    dispatch(loadPostsFailure());
    // dispatch(displayAlert(err));
  }
};

export const addPostRequest = (newPost) => async (dispatch) => {
  try {
    // newPost is an object
    const post = await axios.post("/api/createPost", newPost);
    dispatch(addPost(post));
  } catch (err) {}
};

export const updatePostRequest = (id, updatedPost) => async (dispatch) => {
  try {
    const post = await axios.post(`/api/updatePost/${id}`, updatedPost);
    dispatch(updatePost(post));
  } catch (err) {}
};

export const displayAlert = (text) => () => {
  alert(text);
};
