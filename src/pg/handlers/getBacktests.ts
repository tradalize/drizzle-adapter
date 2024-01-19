import { getDbClient } from "../db.js";

export function getBacktests(dbUrl: string) {
  const { db } = getDbClient(dbUrl);

  const backtests = db.query.backtests.findMany();

  return backtests;
}
