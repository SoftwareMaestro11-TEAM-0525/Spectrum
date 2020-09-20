import User from "../models/User";
import crypto from "crypto";
import uuid from "uuid4";

export class UserService {
  static register = async (req) => {
    const user = req.body;
    user.user_id = uuid();

    const existedById = await User.findOneByUserId(user.user_id);

    if (existedById != null) {
      let err = new Error();
      err.message = "This User_ID is already in use";
      err.status = 400;
      throw err;
    }

    const existedByEmail = await User.findOneByUserEmail(user.user_email);

    if (existedByEmail != null) {
      let err = new Error();
      err.message = "This User_Email is already in use";
      err.status = 400;
      throw err;
    }

    const encrypted = crypto
      .createHmac("sha1", process.env.PASSWORD_KEY)
      .update(user.user_pw)
      .digest("base64");

    user.user_pw = encrypted;

    try {
      return await User.create(user);
    } catch (err) {
      err.message = "Failed to Sign up";
      err.status = 500;
      throw err;
    }
  };

  static findOneByUserId = async (req) => {
    const user_id = req;
    const existed = await User.findOneByUserId(user_id);

    if (existed == null) {
      let err = new Error();
      err.message = "User not Found";
      err.status = 400;
      throw err;
    }

    return existed;
  };

  static updateUser = async (req) => {
    try {
      const encrypted = crypto
        .createHmac("sha1", process.env.PASSWORD_KEY)
        .update(req.user.user_pw)
        .digest("base64");

      return await User.update(req.user_id, encrypted, req.user.user_name);
    } catch (err) {
      err.message = "Update faild";
      err.status = 500;
      throw err;
    }
  };
}
