import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

// Prefer a single DATABASE_URL env var (e.g. for Heroku). Fall back to individual vars.
const connectionString = process.env.DATABASE_URL || undefined

const pool = new Pool(
  connectionString
    ? { connectionString, ssl: process.env.PGSSLMODE === 'require' }
    : {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5432,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: process.env.PGSSLMODE === 'require' || false,
      }
)

export default pool
