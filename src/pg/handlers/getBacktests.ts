import { getDbClient } from "../db.js";

export function getBacktests(dbUrl: string) {
  const { db, endConnection } = getDbClient(dbUrl);

  const backtests = db.query.backtests.findMany();

  endConnection();

  return backtests;
}
