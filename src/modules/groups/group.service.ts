import { db } from "../../db/index.js";
import { userGroups, groups } from "../../db/schema.js";
import { AppError } from "../../utils/AppError.js";
import { eq, and, count } from "drizzle-orm";

export class GroupService {
  async removeUser(userId: number, groupId: number) {
    return await db.transaction(async (tx) => {
      const deleted = await tx
        .delete(userGroups)
        .where(
          and(eq(userGroups.userId, userId), eq(userGroups.groupId, groupId)),
        )
        .returning();

      if (deleted.length === 0) {
        throw new AppError(404, "User not found in this group");
      }

      const [memberCount] = await tx
        .select({ value: count() })
        .from(userGroups)
        .where(eq(userGroups.groupId, groupId));

      if (memberCount.value === 0) {
        await tx
          .update(groups)
          .set({ status: "empty" })
          .where(eq(groups.id, groupId));
      }

      return { message: "User removed successfully" };
    });
  }
}
