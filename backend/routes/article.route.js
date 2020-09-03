const router = require("express").Router();
import {ArticleController} from "../controller/article.controller";

router.get("/:user_id/:node_id", ArticleController.read);
router.post("/", ArticleController.write);
//router.delete("/:user_id/:node_id", controller.delete);
router.patch("/:user_id/:node_id", ArticleController.update);

module.exports = router;
