import { ArticleService } from "../service/article.service";
import { FileService } from "../service/file.service";
export class FileController {
  static upload = async (req, res, next) => {
    try {
      //const result = await ArticleService.updateFileUrl(req);

      return res.status(200).json({
        success: true,
        message: "File upload success",
        result: "result",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const result = await FileService.delete(req);
      const result2 = await ArticleService.deleteFileUrl(req);

      return res.status(200).json({
        success: true,
        message: "S3 object delete success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
