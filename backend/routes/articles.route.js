const router = require("express").Router();
import { ArticleController } from "../controller/article.controller";
import authMiddleware from "../middlewares/auth";

router.get(
  "/:user_id/contents",
  authMiddleware,
  ArticleController.readArticlesContentByUserId
);

module.exports = router;
