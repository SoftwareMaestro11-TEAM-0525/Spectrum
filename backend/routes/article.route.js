const router = require("express").Router();
import { ArticleController } from "../controller/article.controller";

router.get("/:user_id/:node_id", ArticleController.read);
router.post("/", ArticleController.write);
router.patch("/:user_id/:node_id", ArticleController.update);
router.delete("/:user_id/:node_id", ArticleController.delete);

module.exports = router;
