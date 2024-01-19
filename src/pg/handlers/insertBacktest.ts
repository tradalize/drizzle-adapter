import { getDbClient } from "../db.js";
import { InsertTrade, trades } from "../schema.js";

export async function insertBacktest(dbUrl: string, payload: InsertTrade) {
  const { db } = getDbClient(dbUrl);

  const insertedTrade = await db.insert(trades).values(payload).returning();

  return insertedTrade;
}
