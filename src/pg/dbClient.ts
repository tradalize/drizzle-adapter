import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "./schema.js";

export function getDbClient(dbUrl: string) {
  return drizzle(postgres(dbUrl), { schema });
}
