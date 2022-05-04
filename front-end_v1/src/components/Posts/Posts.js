/** @format */

import React, { useEffect } from "react";
// Single Post component
import { Post } from "./Post/Post";
// styles
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadTodos } from "../../statesRedux/thunksLogicSide/postsThunks";

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  // Redux State - Posts
  const posts = useSelector((state) => state.posts.data);
  // Redux dispatch
  const dispatch = useDispatch();
  console.log("posts enty", posts);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
