const router = require("express").Router();
import { ArticleController } from "../controller/article.controller";
import authMiddleware from "../middlewares/auth";

router.get("/:user_id/:node_id", authMiddleware, ArticleController.read);
router.post("/", authMiddleware, ArticleController.write);
router.patch("/:user_id/:node_id", authMiddleware, ArticleController.update);
router.delete("/:user_id/:node_id", authMiddleware, ArticleController.delete);

module.exports = router;
