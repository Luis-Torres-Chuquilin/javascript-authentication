/** @format */

// Actions Creators

// LOAD POSTS , POGRESS , FAILURE
export const LOAD_POSTS_IN_PROGRESS = "LOAD_POSTS_IN_PROGRESS";
export const loadPostsInProgress = () => ({
  type: LOAD_POSTS_IN_PROGRESS,
});

export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const loadPostsFailure = () => ({
  type: LOAD_POSTS_FAILURE,
});

export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const loadPostsSuccess = (posts) => ({
  type: LOAD_POSTS_SUCCESS,
  payload: { posts },
});

// CREATE - UPDATE - REMOVE
export const ADD_POST = "CREATE_POST";
export const addPost = (post) => ({
  type: ADD_POST,
  payload: { post },
});

export const UPDATE_POST = "UPDATE_POST";
export const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: { post },
});

export const REMOVE_POST = "REMOVE_POST";
export const removePost = (post) => ({ type: REMOVE_POST, payload: { post } });
