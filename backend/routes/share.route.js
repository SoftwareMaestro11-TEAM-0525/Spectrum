const router = require("express").Router();
import { ShareMindmapController } from "../controller/share/mindmap.controller";
import { ShareArticleController } from "../controller/share/article.controller";
import authMiddleware from "../middlewares/auth";

router.get("/mindmap/:share_key",ShareMindmapController.read);
// router.post("/mindmap",authMiddleware,ShareMindmapController.create);
//router.delete("/mindmap/:user_id",ShareMindmapController.delete);

// router.get("/article/:share_key",ShareArticleController.read);
// router.post("/article",authMiddleware,ShareArticleController.create);
//router.delete("/article/:share_key",ShareArticleController.delete);
module.exports = router;
