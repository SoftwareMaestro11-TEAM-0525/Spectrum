const router = require("express").Router();
import article from "./article.route";
import articles from "./articles.route";
import timeline from "./timeline.route";
import user from "./user.route";
import auth from "./auth.route";
import cytoscape from "./cytoscape.route";
import file from "./file.route";
import share from "./share.route";

router.use("/auth", auth);
router.use("/cytoscape", cytoscape);
router.use("/article", article);
router.use("/articles",articles);
router.use("/timeline", timeline);
router.use("/user", user);
router.use("/file", file);
router.use("/share", share);

module.exports = router;
