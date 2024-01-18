import { getDbClient } from "../db.js";
import { InsertTrade, trades } from "../schema.js";

export async function insertBacktest(dbUrl: string, payload: InsertTrade) {
  const { db, endConnection } = getDbClient(dbUrl);

  const insertedTrade = await db.insert(trades).values(payload).returning();

  endConnection();

  return insertedTrade;
}
