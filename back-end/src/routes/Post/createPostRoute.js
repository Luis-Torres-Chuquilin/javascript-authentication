/** @format */

// /** @format */

// import { getDbConnection } from "../../dbConnection/db";

import { PostMessage } from "../../models/posts/postMessage";

export const createPostRoute = {
  path: "/api/createPost",
  method: "post",
  handler: async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
      await newPost.save();

      console.log("request generated from:", req.headers.referer);
      res.status(201).json(newPost);
    } catch (err) {
      console.log("createPost", err);
      res.status(409).json({ message: error.message });
    }
  },
};
