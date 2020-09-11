import { FileService } from "../service/file.service";

export class FileController {
  static upload = async (req, res, next) => {
    try {
      const result = { url: req.file };

      return res.status(200).json({
        success: true,
        message: "File upload success",
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
