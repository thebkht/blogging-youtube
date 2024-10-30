import dotenv from "dotenv";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/vercel-postgres";

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined");
}

export const db = drizzle(sql, { schema });
