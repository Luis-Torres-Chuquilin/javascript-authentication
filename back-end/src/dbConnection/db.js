/** @format */

import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let client;
let db;

export const initializeDbConnection = async () => {
  try {
    client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("react-auth-db");
  } catch (e) {
    // To improve the error handling visit the next link:
    // https://sematext.com/blog/node-js-error-handling/
  }
};

export const getDbConnection = (dbName) => {
  //   const db = client.db(dbName);

  return db;
};

export const connectToMongoose = async (mongoConnection) => {
  const client = await mongoose.connect(mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // return client;
};
