import { ShareArticleService } from "../../service/share/article.service";
import { ArticleService } from "../../service/article.service";
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
      console.log(err);
      next(err);
    }
  };

  static read = async (req, res, next) => {
    try {
      const result = await ShareArticleService.findByShareKey(
        req.params.share_key
      );
      console.log(result);
      if (result.secret == true) {
        return res.status(403).json({
          success: false,
          message: "this article is SECRET!",
        });
      }
      await ShareArticleService.validShareKey(result);
      return res.status(200).json({
        success: true,
        message: "Get shared article success",
        result: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const result = await ShareArticleService.deleteSharedKey(
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
      console.log(err);
      next(err);
    }
  };

  static updateHit = async (req, res, next) => {
    try {
      const result = await ShareArticleService.updateHit(req.params.share_key);
      if (result.n == 0) {
        let err = new Error();
        err.message = "shared article not found";
        err.status = 400;
        throw err;
      } else {
        return res.status(200).json({
          success: true,
          message: "Update share article hit success",
          result: result,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static readArticleInfo = async (req, res, next) => {
    try {
      const result = await ArticleService.read(req.params);

      if (result.secret == true) {
        return res.status(403).json({
          success: false,
          message: "This article is Secret",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Get Article success",
          result: result,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
