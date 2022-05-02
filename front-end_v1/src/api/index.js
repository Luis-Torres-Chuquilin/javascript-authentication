/** @format */

import axios from "axios";

const url = "/api/allPosts";

export const fetchPost = () => axios.get(url);

export const createPost = (newPost) => axios.post("/api/createPost", newPost);

export const updatePost = (id, updatePost) =>
  axios.post(`/api/updatePost/${id}`, updatePost);
