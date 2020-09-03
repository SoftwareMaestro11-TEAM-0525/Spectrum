import express from "express"
import { UserController } from "../controller/user.controller"
const router = express.Router();

router.post('/',UserController.register);

router.get('/:user_id',UserController.getUserById);
module.exports = router;