import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      hashed_password TEXT,
      username TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'member',
      gold_balance INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      expires_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS houses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      owner_id TEXT NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      location TEXT,
      last_paid DATE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS listings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      seller_id TEXT NOT NULL REFERENCES users(id),
      item_name TEXT NOT NULL,
      description TEXT,
      starting_bid INTEGER NOT NULL,
      current_bid INTEGER,
      current_bidder_id TEXT REFERENCES users(id),
      ends_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bids (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      listing_id UUID NOT NULL REFERENCES listings(id),
      bidder_id TEXT NOT NULL REFERENCES users(id),
      amount INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS invites (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token TEXT NOT NULL UNIQUE,
      invited_by TEXT NOT NULL REFERENCES users(id),
      used_at TIMESTAMPTZ,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)
  console.log('Tables created successfully')
}