const router = require("express").Router();
const auth = require("./auth.route");
const cytoscape_info = require("./cytoscape_info.route");
const article = require("./article.route");

router.use("/auth", auth);
router.use("/cytoscape_info", cytoscape_info);
router.use("/article", article);

module.exports = router;
