const router = require("express").Router();
import { FileController } from "../controller/file.controller";
import { upload } from "../util/upload";
import authMiddleware from "../middlewares/auth";

router.post("/", authMiddleware, upload.single("file"), FileController.upload);
router.delete(
  "/:user_id/:node_id/:bucket/:key",
  authMiddleware,
  FileController.delete
);
module.exports = router;
