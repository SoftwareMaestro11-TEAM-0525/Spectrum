import express from "express";
import { UserController } from "../controller/user.controller";
const router = express.Router();

router.post("/", UserController.register);

router.get("/:user_id", UserController.getUserById);

router.patch("/:user_id", UserController.updateUser);

module.exports = router;
