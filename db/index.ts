import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// We use generic PostgreSQL, so we'll use the 'pg' driver instead of neon
// But wait, Drizzle works great with pg pooling or neon.
// Let's use standard pg driver since we installed 'pg'.

import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';

// Validate env var
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzlePg(pool, { schema });
