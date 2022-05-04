/** @format */

import * as api from "../api";

// Actions Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log("createPost", err);
  }
};

export const updatePost = (id, posts) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, posts);

    dispatch({ type: "UPDATE", payload: data });
  } catch (err) {
    console.log("updatepost", err);
  }
};
