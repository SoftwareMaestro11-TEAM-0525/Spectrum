import CytoscapeInfo from "../models/Cytoscape_info";

export class CytoscapeService {
  static getById = async (req) => {
    const existed = await CytoscapeInfo.findOneByUserId(req);

    if (existed == null) {
      let err = new Error();
      err.message = "User not Found";
      err.status = 400;
      throw err;
    }

    return existed;
  };

  static init = async (req) => {
    const user_id = req.user_id;
    const cyjson = req.cyjson;

    const existed = await CytoscapeInfo.findOneByUserId(user_id);

    if (existed != null) {
      let err = new Error();
      err.message = "This user already has a cyjson.";
      err.status = 400;
      throw err;
    }
    try {
      return await CytoscapeInfo.create(user_id, cyjson);
    } catch (err) {
      err.message = "Cyjson init fail";
      err.status = 500;
      throw err;
    }
  };

  static updateById = async (req) => {
    const { user_id, cyjson } = req;
    try {
      return await CytoscapeInfo.update(user_id, cyjson);
    } catch (err) {
      err.message = "Cyjson update fail";
      err.status = 500;
      throw err;
    }
  };
}
