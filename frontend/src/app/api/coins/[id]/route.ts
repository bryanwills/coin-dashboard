import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export async function DELETE(req: Request, { params }: any) {
  const { id } = params;
  try {
    await pool.query('DELETE FROM coins WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Coin deleted successfully' });
  } catch (error) {
    console.error('Error deleting coin:', error);
    return NextResponse.json({ error: 'Failed to delete coin' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const data = await req.json();
  try {
    await pool.query('UPDATE coins SET name = $1, year = $2 WHERE id = $3', [
      data.name,
      data.year,
      id,
    ]);
    return NextResponse.json({ message: 'Coin updated successfully' });
  } catch (error) {
    console.error('Error updating coin:', error);
    return NextResponse.json({ error: 'Failed to update coin' }, { status: 500 });
  }
}

