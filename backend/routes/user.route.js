import express from "express";
import { UserController } from "../controller/user.controller";
const router = express.Router();
import authMiddleware from "../middlewares/auth";

router.post("/", UserController.register);
router.get("/:user_id", authMiddleware, UserController.getUserById);
router.patch("/:user_id", authMiddleware, UserController.updateUser);

module.exports = router;
