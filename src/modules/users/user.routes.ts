import { Router } from "express";
import { UserController } from "./user.controller.js";

const router: Router = Router();
const controller = new UserController();

router.get("/", (req, res, next) => controller.getAllUsers(req, res, next));

export default router;
