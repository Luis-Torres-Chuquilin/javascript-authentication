/** @format */

import mongoose from "mongoose";
import { PostMessage } from "../../models/posts/postMessage";

export const updatePostRoute = {
  path: "/api/updatePost/:id",
  method: "post",
  handler: async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    console.log("post updated");
    res.status(200).json(updatePost);
  },
};
