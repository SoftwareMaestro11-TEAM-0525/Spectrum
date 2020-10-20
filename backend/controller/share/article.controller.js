import { ShareArticleService } from "../../service/share/article.service";

export class ShareArticleController {
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
