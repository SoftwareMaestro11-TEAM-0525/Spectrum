const router = require("express").Router();
import { FileController } from "../controller/file.controller";
import { upload } from "../util/upload";
import authMiddleware from "../middlewares/auth";

router.use("/check", authMiddleware);
router.post("/", upload.single("file"), FileController.upload);

module.exports = router;
