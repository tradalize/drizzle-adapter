import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "./schema.js";

let connection: ReturnType<typeof postgres>;

export function getDbClient(dbUrl: string) {
  if (!connection) {
    connection = postgres(dbUrl);
  }

  const db = drizzle(connection, { schema });

  const endConnection = () => {
    void connection.end();
  };

  return {
    db,
    endConnection,
  };
}
