import { db } from "../../db/index.js";
import { groups } from "../../db/schema.js";

export class GroupRepository {
  async findAll(limit: number, offset: number) {
    return db.select().from(groups).limit(limit).offset(offset);
  }
}
