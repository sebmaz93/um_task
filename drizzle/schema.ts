import { pgTable, serial, varchar, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const groups = pgTable("groups", {
	id: serial().notNull(),
	name: varchar({ length: 255 }).notNull(),
	status: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const users = pgTable("users", {
	id: serial().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const userGroups = pgTable("user_groups", {
	userId: integer("user_id").notNull(),
	groupId: integer("group_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_groups_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [groups.id],
			name: "user_groups_group_id_fkey"
		}).onDelete("cascade"),
]);
