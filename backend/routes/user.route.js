import express from "express";
import { UserController } from "../controller/user.controller";
const router = express.Router();
import authMiddleware from "../middlewares/auth";

router.post("/", UserController.register);

router.use("/check", authMiddleware);
router.get("/:user_id", UserController.getUserById);

router.use("/check", authMiddleware);
router.patch("/:user_id", UserController.updateUser);

module.exports = router;
