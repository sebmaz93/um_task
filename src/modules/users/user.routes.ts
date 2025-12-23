import { Router } from "express";
import { UserController } from "./user.controller.js";

const router: Router = Router();
const controller = new UserController();

router.get("/", controller.getAllUsers);

export default router;
