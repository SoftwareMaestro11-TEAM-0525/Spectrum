import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import indexRoute from "./routes/index.route.js";
import logger from "morgan";
import AWS from "aws-sdk";
import history from "connect-history-api-fallback";

var app = express();
dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/api", indexRoute);

app.use(history({}));
app.use(express.static(path.join(__dirname, "./public")));
// errorHandler
app.use(function (err, req, res, next) {
  logger(err.message);
  return res
    .status(err.status || 500)
    .json({ success: false, status: err.status, message: err.message });
});

// Connect Mongodb
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  logger("Connected to mongod server");
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//configure AWS

AWS.config.update({
  accessKeyId: process.env.ACESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

module.exports = app;
