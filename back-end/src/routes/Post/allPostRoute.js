/** @format */

// /** @format */

// import { getDbConnection } from "../../dbConnection/db";

import { PostMessage } from "../../models/posts/postMessage";

export const allPostRoute = {
  path: "/api/allPosts",
  method: "get",
  handler: async (req, res) => {
    try {
      const postMessages = await PostMessage.find();

      console.log("request generated from:", req.headers.referer);
      res.status(200).json(postMessages);
    } catch (err) {
      console.log("getPost", err);
    }
  },
};
