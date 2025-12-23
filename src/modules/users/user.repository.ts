import { db, DbClient } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { count } from "drizzle-orm";

export class UserRepository {
  constructor(private db: DbClient = db) {}

  async getAll(limit: number, offset: number) {
    const [data, totalResult] = await Promise.all([
      this.db.select().from(users).limit(limit).offset(offset),
      this.db.select({ count: count() }).from(users),
    ]);

    return {
      data,
      total: totalResult[0].count,
    };
  }
}
