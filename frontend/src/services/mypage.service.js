import axios from "axios";
import authHeader from "@/services/auth-header";

class MypageService {
  getTimelineData(userId) {
    return axios
      .get(`/api/timeline/${userId}`, {
        headers: authHeader()
      })
      .then(
        res => {
          return Promise.resolve(res.data.result);
        },
        err => {
          return Promise.reject(err);
        }
      );
  }
}

export default new MypageService();
