import { Request, Response, NextFunction } from "express";
import { GroupService } from "./group.service.js";
import { removeUserParamsSchema } from "./group.schema.js";
import { paginationQuerySchema } from "../../shared/schemas/pagination.schema.js";

export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = paginationQuerySchema.parse(req.query);
      const result = await this.groupService.getGroups(page, limit);
      res.status(200).json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, groupId } = removeUserParamsSchema.parse(req.params);
      const result = await this.groupService.removeUserFromGroup(
        userId,
        groupId,
      );
      res.status(200).json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  };
}
