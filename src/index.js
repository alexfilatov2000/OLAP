import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import pool from './db/db';
import Staging from './staging';
import Warehouse from './warehouse';

const app = new Koa();
const router = new Router();

app.use(router.routes());

const PORT = 3000;

router.get('/', async () => {
  await Staging.execute();
  await Warehouse.execute();
});

app.listen(PORT, async () => {
  await pool.query('TRUNCATE anime');
  console.log(`>>> Koa started on PORT ${PORT}`);
});
