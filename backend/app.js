var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
var config = require("./config.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/api"));

// Set Sceret Key
app.set("jwt-key", config.jwtKey);

/**
 * Connect Mongodb
 */

var mongoose = require("mongoose");

var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongod server");
});

mongoose.connect(config.mongodbUri);

module.exports = app;
