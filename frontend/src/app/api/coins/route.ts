import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM coins'); // Fetch data from the database
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}
