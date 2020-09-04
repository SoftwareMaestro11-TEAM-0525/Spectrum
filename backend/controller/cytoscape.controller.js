import { CytoscapeService } from "../service/cytoscape.service";

export class CytoscapeController {
  static write = async (req, res, next) => {
    try {
      const result = await CytoscapeService.init(req.body);
      console.log(result);
      return res.status(201).json({
        success: true,
        message: "create cytoscape Success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static read = async (req, res, next) => {
    try {
      const result = await CytoscapeService.getById(req.params.user_id);

      return res.status(200).json({
        success: true,
        message: "Get cytoscape success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static update = async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const cyjson = req.body.cyjson;

      const result = await CytoscapeService.updateById({ user_id, cyjson });

      return res.status(200).json({
        success: true,
        message: "Update cytoscape success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
