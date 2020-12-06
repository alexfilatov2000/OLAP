import pg from 'pg';
import config from '../config';

const pool = new pg.Pool({
    user: config.warehouse.user,
    host: config.warehouse.host,
    database: config.warehouse.database,
});
pool.connect();

export default pool;
