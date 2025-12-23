import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, dbConnectionString } from "../config/env.js";
import * as schema from "./schema.js";

const queryClient = postgres(dbConnectionString, {
  max: env.DB_POOL_MAX,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: true,
});

export const db = drizzle(queryClient, {
  schema,
  logger: env.NODE_ENV === "development",
});

export type DbClient = typeof db;

export async function closeDb() {
  await queryClient.end();
}
