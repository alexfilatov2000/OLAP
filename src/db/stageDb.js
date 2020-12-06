import pg from 'pg';
import config from '../config';

const pool = new pg.Pool({
  user: config.stage.user,
  host: config.stage.host,
  database: config.stage.database,
});
pool.connect();

export default pool;
