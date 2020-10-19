import Share from "../../models/Share";
import moment from "moment";
import cryptoRandomString from "crypto-random-string";

export class ShareMindmapService {
  /*
    share_key로 공유할 마인드맵의 cyjson 불러옴
    */
  static findByShareKey = async (req) => {
    const existed = await Share.findOneByShareKey(req);

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

  /*
    share_key로 불러온 마인드맵 유효 검사
    date_validation
    true : 지남
    false : 안지남
*/
  static validShareKey = async (req) => {
    console.log(req);
    const expired = new Date(req);
    if (expired < new Date()) {
      //TODO shared key 삭제
      let err = new Error();
      err.message = "share Key is expired";
      err.status = 410;
      throw err;
    } else return true;
  };

  /*
    shared key 생성

  */
  static creatShareKey = async (req) => {
    let randomString;

    const existed = await Share.findOneByUserId("mindmap", req.user_id);

    if (existed != null) {
      //TODO delete exsited shared Key
    }

    while (true) {
      randomString = cryptoRandomString({ length: 10, type: "alphanumeric" });
      const res = await Share.findOneByShareKey(randomString);
      if (res == null) break;
    }

    try {
      var share = {
        share_key: randomString,
        type: "mindmap",
        user_id: req.user_id,
        created_date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm[Z]"),
        expired_date: moment(moment())
          .add(7, "days")
          .format("YYYY-MM-DD[T]HH:mm[Z]"),
        hit: 0,
      };
      return await Share.createShare(share);
    } catch (err) {
      console.log(err);
      err.message = "Create Share mindmap fail";
      err.status = 500;
      throw err;
    }
  };

  //   static updateById = async (req) => {
  //     const { user_id, cyjson } = req;
  //     try {
  //       return await CytoscapeInfo.update(user_id, cyjson);
  //     } catch (err) {
  //       err.message = "Cyjson update fail";
  //       err.status = 500;
  //       throw err;
  //     }
  //   };
}
