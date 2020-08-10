const router = require("express").Router();
const controller = require("./article.controller");

router.get("/:user_id/:node_id", controller.read);

//router.post("/", controller.wirte);
//router.delete("/:node_id", controller.delete);
//router.patch("/:node_id", controller.update);

module.exports = router;
