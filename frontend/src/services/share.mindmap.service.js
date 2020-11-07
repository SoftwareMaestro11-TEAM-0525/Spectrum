import axios from "axios";
import authHeader from "@/services/auth-header";

const shareURL = "/api/share";

class ShareMindmapService {
  getMindmap(shareKey) {
    console.log(shareKey);
    return axios.get(`${shareURL}/mindmap/${shareKey}`).then(
      res => {
        return Promise.resolve(res.data.result);
      },
      err => {
        if (err.response.status === 400) {
          console.log("올바른 공유 번호가 아닙니다.");
        } else if (err.response.status === 410) {
          console.log("공유 링크가 만료되었습니다.");
        } else {
          console.log("알 수 없는 에러!");
        }

        return Promise.reject(err.response);
      }
    );
  }

  getMindmapInfo(userId) {
    return axios.get(`${shareURL}/mindmapinfo/${userId}`).then(
      res => {
        return Promise.resolve(res.data.result);
      },
      err => {
        if (err.response.status === 400) {
          console.log("올바른 유저가 아닙니다.");
        } else {
          console.log("알 수 없는 에러!");
        }

        return Promise.reject(err);
      }
    );
  }

  makeShareLink(userId) {
    return axios
      .post(
        `${shareURL}/mindmap`,
        { user_id: userId },
        { headers: authHeader() }
      )
      .then(
        res => {
          return Promise.resolve(res.data.result);
        },
        err => {
          console.log(err);
          return Promise.reject(err);
        }
      );
  }

  patchHits(shareKey) {
    return axios.patch(`${shareURL}/mindmap/${shareKey}`).then(
      res => {
        return Promise.resolve(res.data.result);
      },
      err => {
        if (err.response.status === 400) {
          console.log("올바른 공유 번호가 아닙니다.");
        } else {
          console.log("알 수 없는 에러!");
        }

        return Promise.reject(err.response);
      }
    );
  }
}

export default new ShareMindmapService();
