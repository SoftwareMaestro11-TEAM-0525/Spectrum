const router = require("express").Router();
import { ArticleController } from "../controller/article.controller";
import authMiddleware from "../middlewares/auth";

router.use("/check", authMiddleware);
router.get("/:user_id/:node_id", ArticleController.read);

router.use("/check", authMiddleware);
router.post("/", ArticleController.write);

router.use("/check", authMiddleware);
router.patch("/:user_id/:node_id", ArticleController.update);

router.use("/check", authMiddleware);
router.delete("/:user_id/:node_id", ArticleController.delete);

module.exports = router;
