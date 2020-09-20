const router = require("express").Router();
import { CytoscapeController } from "../controller/cytoscape.controller";
import authMiddleware from "../middlewares/auth";

router.patch("/:user_id", authMiddleware, CytoscapeController.update);
router.post("/", authMiddleware, CytoscapeController.write);
router.get("/:user_id", authMiddleware, CytoscapeController.read);

module.exports = router;
