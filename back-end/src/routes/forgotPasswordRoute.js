/** @format */

import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";
import { getDbConnection } from "../db";

export const ForgotPassworRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.parms;

    const db = getDbConnection("react-auth-db");
    const passwordResetCode = uuid();
    const { result } = await db
      .collection("users")
      .updateOne({ email }, { $set: { passwordResetCode } });

    if (
      // this is how mongo identifie how many documents were modifed,
      //it allow us to know if there is an email
      result.nModified > 0
    ) {
      try {
        await sendEmail({
          to: email,
          from: "email@gmail.com",
          subject: "Password reset",
          text: ` To reset your password, click this link:
          hhtp://localhost:3000/reset-password/${passwordResetCode}`,
        });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
    res.sendStatus(200);
  },
};
