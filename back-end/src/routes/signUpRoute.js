/** @format */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }

    // encript the password - two arguments, the plaint text password,
    // and the number of iterations
    const passwordHash = await bcrypt.hash(password, 10);

    // Values  user info
    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    // create an object in the database
    // const result = null;
    try {
      var result = await db.collection("users").insertOne({
        email,
        passwordHash,
        info: startingInfo,
        isVerified: false,
      });
      console.log("user created");
      // it's not controlling the duplicate emails at this point
    } catch (error) {
      console.log("error", error);
    }

    const { insertedId } = result;

    // The data we want to include in the token
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
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
        console.log("token created");
        return res.status(200).json({ token });
      }
    );
  },
};
