import axios from "axios";
import authHeader from "@/services/auth-header";

class ArticleService {
  getArticles({ userID, nodeID }) {
    return axios
      .get(`/api/article/${userID}/${nodeID}`, {
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

  postArticles(payload) {
    return axios
      .post(
        "/api/article",
        {
          user_id: payload.userID,
          node_id: payload.nodeID,
          type: payload.type,
          title: payload.title,
          start_date: payload.startDate,
          end_date: payload.endDate,
          content: payload.content,
          keyword: payload.keyword,
          web_url: payload.webURL,
          file_url: payload.fileURL,
          secret: payload.isSecret
        },
        {
          headers: authHeader()
        }
      )
      .then(
        () => {
          return Promise.resolve();
        },
        err => {
          console.log(err);
          return Promise.reject(err);
        }
      );
  }

  patchArticles({ userID, nodeID, ...payload }) {
    return axios
      .patch(
        `/api/article/${userID}/${nodeID}`,
        {
          user_id: payload.userID,
          node_id: payload.nodeID,
          type: payload.type,
          title: payload.title,
          start_date: payload.startDate,
          end_date: payload.endDate,
          content: payload.content,
          keyword: payload.keyword,
          web_url: payload.webURL,
          file_url: payload.fileURL,
          secret: payload.isSecret
        },
        {
          headers: authHeader()
        }
      )
      .then(
        () => {
          return Promise.resolve();
        },
        err => {
          return Promise.reject(err);
        }
      );
  }

  deleteArticles({ userID, nodeID }) {
    return axios
      .delete(`/api/article/${userID}/${nodeID}`, {
        headers: authHeader()
      })
      .then(
        () => {
          return Promise.resolve();
        },
        err => {
          return Promise.reject(err);
        }
      );
  }
}

export default new ArticleService();
