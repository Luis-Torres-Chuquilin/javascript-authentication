/** @format */

import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_IN_PROGRESS,
  LOAD_POSTS_SUCCESS,
  ADD_POST,
  UPDATE_POST,
  REMOVE_POST,
  // ACTIONS WITN THUNKS
} from "../actions/postActions";

// Reducer todos

// Initial State

const initialState = { isLoading: false, data: [] };

export const posts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // LOAD POSTS , POGRESS , FAILURE
    case LOAD_POSTS_SUCCESS: {
      const { posts } = payload;
      return { ...state, isLoading: false, data: posts };
    }
    case LOAD_POSTS_IN_PROGRESS:
      return { ...state, isLoading: true };
    case LOAD_POSTS_FAILURE:
      return { ...state, isLoading: false };

    // CREATE - UPDATE - REMOVE
    case ADD_POST:
      const { post } = payload;
      // return { ...state, isLoading: false, data: state.data.concat(post) };
      return { ...state, isLoading: false, data: [...state.data, post] };

    case UPDATE_POST:
      const { post: updatedPost } = payload;
      return {
        ...state,
        data: state.data.map((post) => {
          return post.id === updatedPost.id ? updatedPost : post;
          // without { } , you dont need to use return is you use ( post.id === updatedPost.id ? updatedPost : post;)
          // if (post.id === updatedPost.id) {
          //   return updatedPost;
          // }
          // return post;
        }),
      };

    case REMOVE_POST: {
      const { post: postToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((post) => post.id !== postToRemove.id),
      };
    }

    default:
      return state;
  }
};
