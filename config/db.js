const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;
const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {

const conn = await mongoose.connect(process.env.MONGO_URI_test, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected in test mode: ${conn.connection.host}`.cyan.underline.bold
    );
  }else if (process.env.NODE_ENV === "development") {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected in dev mode: ${conn.connection.host}`.cyan.underline.bold
    );
  }
  }

  


module.exports = connectDB;
