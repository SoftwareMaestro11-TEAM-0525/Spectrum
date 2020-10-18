import Share from "../../models/Share";
import moment from "moment";

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
  static validShareKey = async (req)=>{
      if(moment(req).isAfter(moment.format())){
          let err = new Error();
          err.message = "share Key is expired";
          err.status = 410;
          throw err;
      }
      else return true;
  }
//   static init = async (req) => {
//     const user_id = req.user_id;
//     const cyjson = req.cyjson;

//     const existed = await CytoscapeInfo.findOneByUserId(user_id);

//     if (existed != null) {
//       let err = new Error();
//       err.message = "This user already has a cyjson.";
//       err.status = 400;
//       throw err;
//     }
//     try {
//       return await CytoscapeInfo.create(user_id, cyjson);
//     } catch (err) {
//       err.message = "Cyjson init fail";
//       err.status = 500;
//       throw err;
//     }
//   };

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
