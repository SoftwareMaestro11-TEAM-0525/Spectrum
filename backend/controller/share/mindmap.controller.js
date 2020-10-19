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
      await ShareMindmapService.validShareKey(result.expired_date);
      return res.status(200).json({
        success: true,
        message: "Get shared mindmap success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  // static update = async (req, res, next) => {
  //   try {
  //     const user_id = req.params.user_id;
  //     const cyjson = req.body.cyjson;

  //     const result = await CytoscapeService.updateById({ user_id, cyjson });

  //     return res.status(200).json({
  //       success: true,
  //       message: "Update cytoscape success",
  //       result: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}
