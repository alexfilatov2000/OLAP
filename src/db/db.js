import pg from 'pg';
import config from '../config';

// OLAPStage
const pool = new pg.Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
});
pool.connect();

export default pool;
