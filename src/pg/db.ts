import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "./schema.js";

export function getDbClient(dbUrl: string) {
  const connection = postgres(dbUrl);

  const db = drizzle(connection, { schema });

  const endConnection = () => {
    void connection.end();
  };

  return {
    db,
    endConnection,
  };
}
