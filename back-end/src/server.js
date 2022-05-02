/** @format */

import express from "express";
import { routes } from "./routes";
//
import { initializeDbConnection } from "./dbConnection/db";

// new database with mongoose
import { connectToMongoose } from "./dbConnection/db";

// config Files
import { mongodbConfig } from "./config.js/mongoDb";

const PORT = process.env.PORT || 8080;
const mongoConnection = mongodbConfig.server;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body) // This replace the bodyParser middleware, it is already inported by express
app.use(express.json());
// I can add bodyParser.urlencoded ( to have in maind)

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  // app.listen(PORT, () => {
  //   console.log(`Server is listening on port ${PORT}`);
  // });
});

connectToMongoose(mongoConnection)
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server connected - Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log("connection error database.", err.message));
