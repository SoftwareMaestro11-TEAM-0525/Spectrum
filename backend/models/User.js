const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const config = require("../config");

const User = new Schema({
  user_id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  user_pw: {
    type: String,
  },
  user_email: {
    type: String,
    index: true,
    match: /.+|@.+@..+/,
  },
});

User.statics.create = function (user_id, user_pw) {
  const encrypted = crypto
    .createHmac("sha1", config.pwKey)
    .update(user_pw)
    .digest("base64");

  const user = new this({
    user_id,
    user_pw: encrypted,
  });
  return user.save();
};
User.statics.findOneByUser_id = function (user_id) {
  return this.findOne({
    user_id,
  }).exec();
};

User.methods.verify = function (user_pw) {
  const encrypted = crypto
    .createHmac("sha1", config.pwKey)
    .update(user_pw)
    .digest("base64");
  return this.user_pw === encrypted;
};

module.exports = mongoose.model("User", User);
