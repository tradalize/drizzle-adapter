import { getDbClient } from "../db.js";
import { InsertBacktest, backtests } from "../schema.js";

export async function insertBacktest(dbUrl: string, payload: InsertBacktest) {
  const { db } = getDbClient(dbUrl);

  const [insertedBacktest] = await db
    .insert(backtests)
    .values(payload)
    .returning();

  return insertedBacktest;
}
