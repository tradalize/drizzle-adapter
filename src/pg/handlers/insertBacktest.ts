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

insertBacktest("postgres://postgres:39396552@localhost:5432/postgres", {
  strategyName: "test",
  strategyParams: { symbol: "test", timeframe: "1h" },
});
