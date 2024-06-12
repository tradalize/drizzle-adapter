import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import schema from "./schema.js";

let pool: pg.Pool;

export function getDbClient(dbUrl: string) {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: dbUrl,
    });
  }

  const db = drizzle(pool, { schema });

  const endConnection = () => {
    void pool.end();
  };

  return {
    db,
    endConnection,
  };
}
