import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

export class UserRepository {
  async getAll(limit: number, offset: number) {
    return db.select().from(users).limit(limit).offset(offset);
  }
}
