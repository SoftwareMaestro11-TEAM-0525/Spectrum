const router = require("express").Router();
import { FileController } from "../controller/file.controller";
import { upload } from "../util/upload";

router.post("/", upload.single("file"), FileController.upload);

module.exports = router;
