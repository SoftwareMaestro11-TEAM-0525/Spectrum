import mongoose from "mongoose"
import crypto from "crypto"

const Schema = mongoose.Schema;
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
  user_name: {
    type: String,
  },
  user_email: {
    type: String,
    index: true,
    match: /.+|@.+@..+/,
  },
});

User.statics.create = function (req) {
  const user = new this({
    user_id : req.user_id,
    user_pw : req.user_pw,
    user_email : req.user_email,
    user_name : req.user_name
});
  return user.save();
};
User.statics.findOneByUserId = function (user_id) {
  return this.findOne({
    user_id,
  });
};

User.statics.findOneByUserEmail = function (user_email) {
  return this.findOne({
    user_email,
  });
};

User.statics.update = function (user_id,user_pw,user_name){
  return this.updateOne({
    user_id
  },{
    user_pw: user_pw,
    user_name: user_name
  })
};
module.exports = mongoose.model("User", User);
