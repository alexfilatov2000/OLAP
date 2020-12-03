import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import pool from './db/db';
import { transform } from './lib/staging/transform';
import { readdir, parseCsv } from './lib/helpers';
import { checkDuplicates, getStagingInsertQueries } from './lib/anime';

const app = new Koa();
const router = new Router();

app.use(router.routes());

const PORT = 3000;

router.get('/', async () => {
  const files = await readdir('data');
  const arr = [];
  for (const file of files) {
    const fileName = file.split('.')[0];
    const data = await parseCsv(`data/${file}`);
    const transformed = transform[fileName](data);
    arr.push(...transformed);
  }

  const queries = getStagingInsertQueries(checkDuplicates(arr));

  for (const query of queries) {
    try {
      await pool.query(query);
    } catch (err) {
      console.error(err);
    }
  }
});

app.listen(PORT, async () => {
  await pool.query('TRUNCATE anime');
  console.log(`>>> Koa started on PORT ${PORT}`);
});
