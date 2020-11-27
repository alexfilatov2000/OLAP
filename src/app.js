import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import pool from './db/db';
import { transform } from './lib/transform';
import { readdir, parseCsv } from './lib/helpers';

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
  /*
   * Тут проверяем значения в arr на уникальность.
   * Повторяющиеся аниме преобразовываем в одно
   */
});

app.listen(PORT, async () => {
  await pool.query('TRUNCATE anime');
  console.log(`>>> Koa started on PORT ${PORT}`);
});
