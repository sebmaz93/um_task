import { Router } from "express";
import { db } from "../../db/index.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";

const userRepo = new UserRepository(db);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router: Router = Router();

router.get("/", userController.getAllUsers);

export default router;
