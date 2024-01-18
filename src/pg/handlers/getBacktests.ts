import { getDbClient } from "../dbClient.js";

export function getBacktests(dbUrl: string) {
  const db = getDbClient(dbUrl);

  return db.query.backtests.findMany();
}
