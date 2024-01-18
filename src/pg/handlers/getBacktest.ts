import { eq } from "drizzle-orm";
import { getDbClient } from "../db.js";
import { backtests } from "../schema.js";

export async function getBacktest(
  dbUrl: string,
  { id, withTrades }: { id: number; withTrades?: true }
) {
  const { db, endConnection } = getDbClient(dbUrl);

  const backtest = await db.query.backtests.findFirst({
    where: eq(backtests.id, id),
    with: { trades: withTrades },
  });

  endConnection();

  return backtest;
}
