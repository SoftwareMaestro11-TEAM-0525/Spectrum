const router = require("express").Router();
import { CytoscapeController } from "../controller/cytoscape.controller";

router.patch("/:user_id", CytoscapeController.update);
router.post("/", CytoscapeController.write);
router.get("/:user_id", CytoscapeController.read);

module.exports = router;
