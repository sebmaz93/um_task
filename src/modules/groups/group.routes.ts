import { Router } from "express";
import { GroupController } from "./group.controller.js";

const router: Router = Router();
const controller = new GroupController();

router.get("/", (req, res, next) => controller.getAllGroups(req, res, next));

router.delete("/:groupId/users/:userId", (req, res, next) =>
  controller.removeUser(req, res, next),
);

export default router;
