const router = require("express").Router();
import article from "./article.route";
import user from "./user.route";
import auth from "./auth.route";
import cytoscape from "./cytoscape.route";
import file from "./file.route";
import share from "./share.route"

router.use("/auth", auth);
router.use("/cytoscape", cytoscape);
router.use("/article", article);
router.use("/user", user);
router.use("/file", file);
router.use("/share",share);

module.exports = router;
