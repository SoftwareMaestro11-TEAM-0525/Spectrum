import { async } from "crypto-random-string";
import { ArticleService } from "../service/article.service";

export class ArticleController {
  static read = async (req, res, next) => {
    try {
      const result = await ArticleService.read(req.params);

      return res.status(200).json({
        success: true,
        message: "Get Article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static readAllContent = async (req, res, next) => {
    try {
      const result = await ArticleService.readAllContent(req.params);

      return res.status(200).json({
        success: true,
        message: "Get Article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static write = async (req, res, next) => {
    try {
      const result = await ArticleService.write(req.body);

      return res.status(201).json({
        success: true,
        message: "Write Article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static update = async (req, res, next) => {
    try {
      const result = await ArticleService.update(req);

      return res.status(200).json({
        success: true,
        message: "Update Article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const result = await ArticleService.delete(req.params);

      return res.status(200).json({
        success: true,
        message: "Delete Article success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
