import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";
import { paginationQuerySchema } from "../../shared/schemas/pagination.schema.js";

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = paginationQuerySchema.parse(req.query);
      const result = await this.userService.getUsers(page, limit);

      res.status(200).json({
        status: "success",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
}
