const router = require("express").Router();
import { ArticleController } from "../controller/article.controller";
import authMiddleware from "../middlewares/auth";

router.get(
  "/:user_id/:node_id/contents",
  authMiddleware,
  ArticleController.readArticlesContent
);
router.get("/:user_id/:node_id", authMiddleware, ArticleController.readArticle);
router.get("/:user_id", authMiddleware, ArticleController.readArticles);
router.post("/", authMiddleware, ArticleController.write);
router.patch("/:user_id/:node_id", authMiddleware, ArticleController.update);
// router.delete("/:user_id/:node_id", authMiddleware, ArticleController.delete);
router.delete("/:user_id/:node_id", ArticleController.delete);

router.post(
  "/recommend",
  authMiddleware,
  ArticleController.readArticlesContentByUserIdForRecommend
);

router.post(
  "/keyword",
  authMiddleware,
  ArticleController.readArticlesContentByUserIdForKeyword
);

router.post(
  "/sentence",
  authMiddleware,
  ArticleController.readArticlesContentByUserIdForSentence
);

module.exports = router;
