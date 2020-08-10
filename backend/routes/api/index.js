const router = require("express").Router();
const auth = require("./auth");
const cytoscape_info = require("./cytoscape_info");
const article = require("./article");

router.use("/auth", auth);
router.use("/cytoscape_info", cytoscape_info);
router.use("/article", article);

module.exports = router;
