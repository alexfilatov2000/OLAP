import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// OLAPstage
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
});
pool.connect();

export default pool;
