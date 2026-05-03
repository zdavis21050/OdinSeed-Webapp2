import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', message: 'Server and database connected' })
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})