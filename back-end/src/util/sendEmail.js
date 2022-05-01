/** @format */

import sendgrid from "@sendgrid/mail";
import nodemailer from "nodemailer";

sendgrid.setApiKey(process.env.SENGRID_API_KEY);

const mail = process.env._MAIL;
const password = process.env._PASS;

export const sendEmail = async ({ to, from, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "Luis.Chuquilin@Student.Torrens.edu.au",
      pass: "qq97qf24ffL",
    },
  });

  let info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};
