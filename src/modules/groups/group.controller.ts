import { Request, Response, NextFunction } from "express";
import { GroupService } from "./group.service.js";
import { GroupRepository } from "./group.repository.js";
import { paginationSchema } from "../users/user.schema.js"; // Reuse pagination schema
import { removeUserParams } from "./group.schema.js";

const groupService = new GroupService();
const groupRepo = new GroupRepository();

export class GroupController {
  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = paginationSchema.parse(req).query;

      const data = await groupRepo.findAll(limit, offset);

      res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId, userId } = removeUserParams.parse(req).params;

      const result = await groupService.removeUser(userId, groupId);

      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}
