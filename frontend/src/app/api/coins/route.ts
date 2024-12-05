import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

// GET: Fetch all coins
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM coins');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

// POST: Add a new coin with file uploads
export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  fs.mkdirSync(uploadDir, { recursive: true });

  try {
    const formData = await req.formData();
    const fields: { [key: string]: string } = {};
    const images: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof Blob) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const filePath = path.join(uploadDir, `${Date.now()}-${key}`);
        fs.writeFileSync(filePath, buffer);
        images.push(`/uploads/${path.basename(filePath)}`);
      } else {
        fields[key] = value as string;
      }
    }

    // Insert the coin into the database
    await pool.query(
      'INSERT INTO coins (name, year, denomination, price, condition, potential_value, images) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        fields.name,
        parseInt(fields.year, 10),
        fields.denomination,
        parseFloat(fields.price),
        fields.condition,
        fields.potential_value ? parseFloat(fields.potential_value) : null,
        images,
      ]
    );

    return NextResponse.json({ message: 'Coin created successfully!' });
  } catch (error) {
    console.error('Error creating coin:', error);
    return NextResponse.json({ error: 'Failed to create coin' }, { status: 500 });
  }
}

// PUT: Update an existing coin by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id; // Access the dynamic route parameter
  const data = await req.json(); // Parse the request body

  try {
    const result = await pool.query(
      'UPDATE coins SET name = $1, year = $2, denomination = $3, price = $4, condition = $5, potential_value = $6 WHERE id = $7 RETURNING *',
      [
        data.name,
        parseInt(data.year, 10),
        data.denomination,
        parseFloat(data.price),
        data.condition,
        data.potential_value ? parseFloat(data.potential_value) : null,
        id,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating coin:', error);
    return NextResponse.json({ error: 'Failed to update coin' }, { status: 500 });
  }
}
