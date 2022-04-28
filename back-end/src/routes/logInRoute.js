/** @format */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        {
          id,
          isVerified,
          email,
          info,
        },
        // second argument, it is the secret JSON web token secret,
        // only our server will know
        process.env.JWT_SECRET,
        // third parameter, expiration time
        {
          expiresIn: "2d",
        },
        // Last argument a callback
        (err, token) => {
          if (err) {
            console.log("erro en JWT");
            return res.status(500).json(err);
          }
          console.log("token enviado");
          return res.status(200).json({ token });
        }
      );
    } else {
      console.log("ERROR");
      // res.sendStatus(401); // display UnAuthorized
      res.status(401).send("Error, Unauthorized");
    }
  },
};
