import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";
import { paginationSchema } from "./user.schema.js";

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = paginationSchema.parse(req).query;
      const data = await userService.getUsers(limit, offset);

      res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
