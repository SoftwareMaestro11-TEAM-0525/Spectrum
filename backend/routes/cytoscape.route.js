const router = require("express").Router();
import { CytoscapeController } from "../controller/cytoscape.controller";
import authMiddleware from "../middlewares/auth";

router.use("/check", authMiddleware);
router.patch("/:user_id", CytoscapeController.update);

router.use("/check", authMiddleware);
router.post("/", CytoscapeController.write);

router.use("/check", authMiddleware);
router.get("/:user_id", CytoscapeController.read);

module.exports = router;
