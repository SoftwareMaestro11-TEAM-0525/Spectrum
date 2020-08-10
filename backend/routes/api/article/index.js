const router = require("express").Router();
const controller = require("./article.controller");

router.get("/:user_id/:node_id", controller.read);
router.post("/", controller.write);
router.delete("/:user_id/:node_id", controller.delete);
router.patch("/:user_id/:node_id", controller.update);

module.exports = router;
