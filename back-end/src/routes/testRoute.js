/** @format */

const nodemailer = require("nodemailer");

export const testRoute = {
  path: "/api/test",
  method: "get",
  handler: async (req, res) => {
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: "587",
        secure: false, // true for 465, false for other ports
        auth: {
          user: "Luis.Chuquilin@Student.Torrens.edu.au",
          pass: "qq97qf24ffL",
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "Luis.Chuquilin@Student.Torrens.edu.au",
        to: "letorres.ch@gmail.com",
        subject: "Hello Cmarron", // Subject line
        text: "Prueba test with mails", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    await main().catch(console.error);

    res.status(200).send("It works!");
  },
};
