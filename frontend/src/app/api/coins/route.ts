import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

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

// Helper to convert Request to IncomingMessage
async function toNodeRequest(req: Request): Promise<Readable> {
  const readable = new Readable();
  readable._read = () => {}; // No-op
  readable.push(Buffer.from(await req.arrayBuffer()));
  readable.push(null);
  return readable;
}

export async function POST(req: Request) {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads");
  form.keepExtensions = true;
  fs.mkdirSync(uploadDir, { recursive: true });

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  try {
    const readable = await toNodeRequest(req);
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(readable, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

  try {
    const images = Array.isArray(files.images)
      ? files.images.map((file) => `/uploads/${path.basename(file.path)}`)
      : files.images
      ? [`/uploads/${path.basename(files.images.path)}`]
      : [];

    await pool.query(
      "INSERT INTO coins (name, year, denomination, price, condition, potential_value, images) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        fields.name,
	parseInt(fields.year, 10),
        fields.denomination,
	parseFloat(fields.price),
        fields.condition,
	parse.Float(fields.potential_value),
        images,
      ]
    );

    return NextResponse.json({ message: "Coin created successfully!" });
  } catch (error) {
    console.error("Error creating coin:", error);
    return NextResponse.json({ error: "Failed to create coin" }, { status: 500 });
  }
}
