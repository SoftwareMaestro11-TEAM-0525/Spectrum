import axios from "axios";
import authHeader from "@/services/auth-header";

const authURL = "/api/auth";
const userURL = "/api/user";

class AuthService {
  login(user) {
    return axios
      .post(authURL + "/login", {
        user_email: user.username,
        user_pw: user.password
      })
      .then(
        res => {
          return Promise.resolve(res);
        },
        err => {
          console.log(err);
          return Promise.reject(err);
        }
      );
  }

  getUserName(user_id) {
    return axios
      .get(userURL + "/" + user_id, {
        headers: authHeader()
      })
      .then(
        res => {
          return Promise.resolve(res);
        },
        err => {
          console.log(err);
          return Promise.reject(err);
        }
      );
  }

  register(user) {
    return axios
      .post(userURL, {
        user_name: user.username,
        user_email: user.email,
        user_pw: user.password
      })
      .then(
        res => {
          return Promise.resolve(res);
        },
        err => {
          console.log(err);
          return Promise.reject(err);
        }
      );
  }
}

export default new AuthService();
