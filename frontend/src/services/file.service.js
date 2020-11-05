import axios from "axios";
import authHeader from "@/services/auth-header";

const fileURL = "/api/file";

class FileService {
  post(formData) {
    return axios
      .post(
        fileURL,
        {
          data: formData
        },
        {
          headers: authHeader()
        }
      )
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

export default new FileService();
