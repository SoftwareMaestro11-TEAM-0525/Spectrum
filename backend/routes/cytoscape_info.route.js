const router = require("express").Router();
const controller = require("../controller/cytoscape_info.controller");

router.put("/:user_id/:cyjson", controller.update);
router.post("/", controller.write);
router.get("/:user_id", controller.read);

module.exports = router;
