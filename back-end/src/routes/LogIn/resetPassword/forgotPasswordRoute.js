/** @format */

import { v4 as uuid } from "uuid";
import { sendEmail } from "../../../util/sendEmail";
import { getDbConnection } from "../../../dbConnection/db";

export const ForgotPassworRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;

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
          from: "Luis.Chuquilin@Student.Torrens.edu.au",
          subject: "Password reset",
          text: ` To reset your password, click this link:
          http://localhost:3000/reset-password/${passwordResetCode}`,
        });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
    res.sendStatus(200); // we send the res.sendStatus(200) , to avoid hackers to know it the email exist or not.
  },
};
