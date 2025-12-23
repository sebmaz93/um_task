import { DbClient } from "../../db/index.js";
import { groups, userGroups } from "../../db/schema.js";
import { eq, and, count } from "drizzle-orm";

type TxClient = Parameters<Parameters<DbClient["transaction"]>[0]>[0];

export class GroupRepository {
  constructor(private readonly db: DbClient) {}

  async findAll(limit: number, offset: number) {
    const [data, totalResult] = await Promise.all([
      this.db.select().from(groups).limit(limit).offset(offset),
      this.db.select({ count: count() }).from(groups),
    ]);
    return { data, total: totalResult[0].count };
  }

  async findById(groupId: number, tx?: TxClient) {
    const client = tx ?? this.db;
    const [group] = await client
      .select()
      .from(groups)
      .where(eq(groups.id, groupId));
    return group ?? null;
  }

  async updateStatus(groupId: number, status: string, tx?: TxClient) {
    const client = tx ?? this.db;
    return client.update(groups).set({ status }).where(eq(groups.id, groupId));
  }

  async removeUserFromGroup(userId: number, groupId: number, tx?: TxClient) {
    const client = tx ?? this.db;
    return client
      .delete(userGroups)
      .where(
        and(eq(userGroups.userId, userId), eq(userGroups.groupId, groupId)),
      )
      .returning();
  }

  async getMemberCount(groupId: number, tx?: TxClient) {
    const client = tx ?? this.db;
    const [result] = await client
      .select({ count: count() })
      .from(userGroups)
      .where(eq(userGroups.groupId, groupId));
    return result.count;
  }
}
