import { DbClient } from "../../db/index.js";
import { GroupRepository } from "./group.repository.js";
import { AppError } from "../../utils/AppError.js";

export class GroupService {
  constructor(
    private readonly db: DbClient,
    private readonly groupRepo: GroupRepository,
  ) {}

  async getGroups(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { data, total } = await this.groupRepo.findAll(limit, offset);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async removeUserFromGroup(userId: number, groupId: number) {
    return await this.db.transaction(async (tx) => {
      const group = await this.groupRepo.findById(groupId, tx);
      if (!group) {
        throw new AppError(404, "Group not found");
      }

      const deleted = await this.groupRepo.removeUserFromGroup(
        userId,
        groupId,
        tx,
      );
      if (deleted.length === 0) {
        throw new AppError(404, "User is not a member of this group");
      }

      const memberCount = await this.groupRepo.getMemberCount(groupId, tx);
      if (memberCount === 0) {
        await this.groupRepo.updateStatus(groupId, "Empty", tx);
      }

      return {
        message: "User removed from group successfully",
        groupStatus: memberCount === 0 ? "Empty" : "NotEmpty",
      };
    });
  }
}
