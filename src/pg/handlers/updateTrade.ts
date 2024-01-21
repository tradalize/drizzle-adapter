import { eq } from "drizzle-orm";
import { getDbClient } from "../db.js";
import { Trade, trades } from "../schema.js";

export async function updateTrade(
  dbUrl: string,
  id: number,
  payload: Partial<Omit<Trade, "id">>
) {
  const { db } = getDbClient(dbUrl);

  const [updatedTrade] = await db
    .update(trades)
    .set(payload)
    .where(eq(trades.id, id))
    .returning();

  return updatedTrade;
}
