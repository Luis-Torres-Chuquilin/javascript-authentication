<!-- @format -->

# Package

This repo hast a getting starter with some configuration already seted up as nodemon, babel

Add:

- npm install bcrypt
- npm install dotenv -- to use env variables
- npm install jsonwebtoken

- npm install uuid -- to generate codes

To use environment variables creating the file .env
and adding this line into your package.json [-r dotenv/config]
"start": "nodemon ... -r dotenv/config ./src/server.js"

# Different ways to configure nodemailer with outlook:

npm install nodemailer

## ONE1

```js
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: "Luis.Chuquilin@Student.Torrens.edu.au",
    pass: "qq97qf24ffL",
  },
  tls: {
    ciphers: "SSLv3",
  },
});
```

## ONE2

```js
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: "587",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "Luis.Chuquilin@Student.Torrens.edu.au",
    pass: "qq97qf24ffL",
  },
});
```
