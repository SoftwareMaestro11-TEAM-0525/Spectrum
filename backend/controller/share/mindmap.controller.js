import { ShareMindmapService } from "../../service/share/mindmap.service";

export class ShareMindmapController {
  static create = async (req, res, next) => {
    try {
      const result = await ShareMindmapService.creatShareKey(req.body);
      return res.status(201).json({
        success: true,
        message: "Create Share key Success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static read = async (req, res, next) => {
    try {
      const result = await ShareMindmapService.findByShareKey(
        req.params.share_key
      );
      await ShareMindmapService.validShareKey(result);
      return res.status(200).json({
        success: true,
        message: "Get shared mindmap success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const result = await ShareMindmapService.deleteSharedKey(
        req.params.share_key
      );
      if (result.n == 0) {
        let err = new Error();
        err.message = "Share Key not found";
        err.status = 400;
        throw err;
      } else {
        return res.status(200).json({
          success: true,
          message: "Delete shared key success",
          result: result,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  static updateHit = async (req, res, next) => {
    try {
      const result = await ShareMindmapService.updateHit(req.params.share_key);
      if (result.n == 0) {
        let err = new Error();
        err.message = "shared mindmap not found";
        err.status = 400;
        throw err;
      } else {
        return res.status(200).json({
          success: true,
          message: "Update share mindmap hit success",
          result: result,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
