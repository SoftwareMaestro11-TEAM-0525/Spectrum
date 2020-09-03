import express from "express";
import { AuthController } from "../controller/auth.controller";
import authMiddleware from "../middlewares/auth";
const router = express.Router();

router.post("/login", AuthController.login);

router.use("/check", authMiddleware);
//router.get("/check", controller.check);

module.exports = router;
