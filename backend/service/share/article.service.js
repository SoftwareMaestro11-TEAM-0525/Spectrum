import Share from "../../models/Share";
import moment from "moment";
import cryptoRandomString from "crypto-random-string";

export class ShareArticleService {
  static findByShareKey = async (req) => {
    const existed = await Share.findOneByShareKey("article", req);

    //not existed
    if (existed == null) {
      let err = new Error();
      err.message = "Share Key not Found";
      err.status = 400;
      throw err;
    }
    //success
    return existed;
  };

  static validShareKey = async (req) => {
    const expired = new Date(req.expired_date);
    if (expired < new Date()) {
      //TODO shared key 삭제
      await Share.deleteShare("mindmap", req.share_key);

      let err = new Error();
      err.message = "share Key is expired";
      err.status = 410;
      throw err;
    } else return true;
  };
}
