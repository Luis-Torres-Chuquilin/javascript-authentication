/** @format */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getDbConnection } from "../db";
import { sendEmail } from "../util/sendEmail";

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

    // arguments, the plaint text password, and the number of iterations
    const passwordHash = await bcrypt.hash(password, 10);

    // create a verification String
    const verificationString = uuid();

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
        verificationString,
      });
      console.log("user created");
      // it's not controlling the duplicate emails at this point
    } catch (error) {
      console.log("error during the creation of user", error);
    }

    console.log(result);
    const { insertedId } = result; //  interedId = _id created in mongodb.

    try {
      await sendEmail({
        to: email,
        from: "Luis.Chuquilin@Student.Torrens.edu.au",
        subject: "Plesase verify your email",
        text: `Thanls for signing up! To verify your email, please clicl here:
           http://localhost:3000/verify-email/${verificationString}
           `,
      });
    } catch (err) {
      console.log("Error in sending Email Verification", err);
      res
        .status(500)
        .json({ error: "Error in sending Email Verification", errorLog: err });

      // res.sendStatus(500);
    }

    // The data we want to include in the token
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      // second argument, it is the secret JSON web token secret,
      process.env.JWT_SECRET,
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
