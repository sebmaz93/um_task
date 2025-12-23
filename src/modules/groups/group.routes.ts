import { Router } from "express";
import { db } from "../../db/index.js";
import { GroupRepository } from "./group.repository.js";
import { GroupService } from "./group.service.js";
import { GroupController } from "./group.controller.js";

const groupRepo = new GroupRepository(db);
const groupService = new GroupService(db, groupRepo);
const groupController = new GroupController(groupService);

const router: Router = Router();

router.get("/", groupController.getAllGroups);
router.delete("/:groupId/users/:userId", groupController.removeUser);

export default router;
