import { ShareArticleService } from "../../service/share/article.service";

export class ShareArticleController {
  static create = async (req, res, next) => {
    try {
      const result = await ShareArticleService.creatShareKey(req.body);
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
      const result = await ShareArticleService.findByShareKey(
        req.params.share_key
      );
      await ShareArticleService.validShareKey(result);
      return res.status(200).json({
        success: true,
        message: "Get shared article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
