import { eq } from "drizzle-orm";
import { getDbClient } from "../dbClient.js";
import { backtests } from "../schema.js";

export function deleteBacktests(dbUrl: string, id: number) {
  const db = getDbClient(dbUrl);

  return db.delete(backtests).where(eq(backtests.id, id));
}
