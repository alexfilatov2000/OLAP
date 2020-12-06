import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import stagePool from './db/stageDb';
import warehousePool from './db/warehouseDb';
import Staging from './staging';
import Warehouse from './warehouse';

const app = new Koa();
const router = new Router();

app.use(router.routes());

const PORT = 3000;

router.get('/', async (ctx) => {
  await Staging.execute();
  await Warehouse.execute();
  ctx.status = 200;
});

app.listen(PORT, async () => {
  await stagePool.query('TRUNCATE anime');
  await warehousePool.query('DELETE from "animeGenres"');
  await warehousePool.query('DELETE from anime');
  console.log(`>>> Koa started on PORT ${PORT}`);
});
