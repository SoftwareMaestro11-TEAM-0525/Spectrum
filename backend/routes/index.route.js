const router = require("express").Router();
import article from "./article.route";
import user from "./user.route";
import auth from "./auth.route";
import cytoscape from "./cytoscape.route";

router.use("/auth", auth);
router.use("/cytoscape", cytoscape);
router.use("/article", article);
router.use("/user", user);

module.exports = router;
