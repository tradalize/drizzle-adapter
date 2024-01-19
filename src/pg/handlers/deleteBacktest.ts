import { eq } from "drizzle-orm";
import { getDbClient } from "../db.js";
import { backtests } from "../schema.js";

export async function deleteBacktests(dbUrl: string, id: number) {
  const { db } = getDbClient(dbUrl);

  await db.delete(backtests).where(eq(backtests.id, id));

  return;
}
