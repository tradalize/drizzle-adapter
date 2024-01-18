import { eq } from "drizzle-orm";
import { getDbClient } from "../dbClient.js";
import { backtests } from "../schema.js";

export function getBacktest(
  dbUrl: string,
  { id, withTrades }: { id: number; withTrades?: true }
) {
  const db = getDbClient(dbUrl);

  return db.query.backtests.findFirst({
    where: eq(backtests.id, id),
    with: { trades: withTrades },
  });
}
