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

    // encript the password - two arguments, the plaint text password,
    // and the number of iterations
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
        // verificationString
      });
      console.log("user created");
      // it's not controlling the duplicate emails at this point
    } catch (error) {
      console.log("error", error);
    }

    const { insertedId } = result;

    //  I don't have token to sendEmail, the next try catch statement is in hold
    // try {
    //   await sendEmail({
    //     to: email,
    //     from: "email@gmail.com",
    //     subject: "Plesase verify your email",
    //     text: `Thanls for signing up! To verify your email, please clicl here:
    //      http://localhost:3000/verift-email/${verificationString}
    //      `,
    //   });
    // } catch (err) {
    //   console.log("Error in sending Email Verification");
    //   // res.sendStatus(500);
    //   // There is an error when the server send an emai that is already in the database, I'm unable to track this error
    //   res
    //     .status(500)
    //     .json({ error: "Error in sending Email Verification", errorLog: err });
    // }

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
