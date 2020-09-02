import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "./config.js"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import indexRoute from "./routes/index.route.js";
let app = express();
dotenv.config()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/api", require(indexRoute));

// Set jwt-sceret Key
app.set("jwt-key", process.env.jwtKey);

// Connect Mongodb
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongod server");
});
mongoose.connect(config.mongodbUri);


export default app;
