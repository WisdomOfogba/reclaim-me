import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres"

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client });
