/** @format */

import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      console.log("received");
      await sendEmail({
        to: "letorres.ch@gmail.com",
        from: "Luis.Chuquilin@Student.Torrens.edu.au",
        subject: "Does this work",
        text: "If your're reading this ... yes confirmed!",
      });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in mail", err);
      res.sendStatus(500);
    }
  },
};
