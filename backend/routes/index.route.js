const router = require("express").Router();
const auth = require("./auth.route");
const cytoscape_info = require("./cytoscape_info.route");
import article from "./article.route";
import user from "./user.route";

router.use("/auth", auth);
router.use("/cytoscape_info", cytoscape_info);
router.use("/article", article);
router.use("/user",user);

module.exports = router;
