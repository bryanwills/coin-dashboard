import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

app.use(cors());
app.use(express.json());

// Get all coins
app.get('/coins', async (req: Request, res: Response) => {
  const { sortBy, order } = req.query;
  const validSorts = ['price', 'denomination', 'year'];
  const orderBy = validSorts.includes(sortBy as string) ? sortBy : 'price';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

  try {
    const result = await pool.query(`SELECT * FROM coins ORDER BY ${orderBy} ${sortOrder} LIMIT 20`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Add a new coin
app.post('/coins', async (req: Request, res: Response) => {
  const { name, year, denomination, price, condition } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO coins (name, year, denomination, price, condition) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, year, denomination, price, condition]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update a coin
app.put('/coins/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, year, denomination, price, condition } = req.body;

  try {
    const result = await pool.query(
      'UPDATE coins SET name = $1, year = $2, denomination = $3, price = $4, condition = $5 WHERE id = $6 RETURNING *',
      [name, year, denomination, price, condition, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete a coin
app.delete('/coins/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM coins WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

