const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
  let connectionURI;
  connectionURI = process.env.DATABASE_LOCAL;
  connectionURI = connectionURI.replace("<username>", process.env.DB_USER);
  connectionURI = connectionURI.replace("<password>", process.env.DB_PASS);
  return connectionURI;
};

const connectDb = async () => {
  console.log("connection to db.........");
  const uri = getConnectionString();
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log("connected to database");
};

module.exports = connectDb;
