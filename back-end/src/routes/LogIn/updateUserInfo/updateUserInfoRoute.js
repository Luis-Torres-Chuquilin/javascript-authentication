/** @format */

import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../../../dbConnection/db";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;
    console.log("req.body", req.body);
    const updates = ({ favoriteFood, hairColor, bio }) =>
      ({
        favoriteFood,
        hairColor,
        bio,
      }(req.body));

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }
    // authorization = Bearer dasdas.32edsad.dsa
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });

      const { id, isVerified } = decoded;

      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's " });

      if (!isVerified)
        return res
          .status(403)
          .json({ message: "You need to verify your email before you update" });

      const db = getDbConnection("react-auth-db");
      const result = await db.collection("users").findOneAndUpdate(
        { _id: ObjectID(id) },

        {
          $set: { info: updates }, // update the information
        },

        { returnOriginal: false }
      );
      const { email, info } = result.value;

      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
