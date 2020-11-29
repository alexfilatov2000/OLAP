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

let func = (Arr, x) => {
  for (let i = 0; i<Arr.length; i++){
    if (Arr[i].name.toLowerCase() === x) return true;
  }
  return false;
}

const getAnimeInsertQuery = values =>
    `INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(',')})`;

router.get('/', async () => {
  const files = await readdir('data');
  let arr = [];
  for (const file of files) {
    const fileName = file.split('.')[0];
    const data = await parseCsv(`data/${file}`);
    const transformed = transform[fileName](data);
    arr.push(...transformed);
  }

  let newArr = [];
  let main = [];
  for (let i = 0; i<arr.length; i++){
    for (let j = i+1; j< arr.length; j++){
      if (arr[i].name.toLowerCase() === arr[j].name.toLowerCase() ){
        if (arr[i].table === 1){
          arr[i].rating = +((arr[i].rating + arr[j].rating)/2).toFixed(2);
          arr[i].viewers = arr[i].viewers + arr[j].viewers;
          arr[i].genre = arr[i].genre + arr[j].genre;
          newArr.push(arr[i]);
        }
      }
    }
  }

  for (let i = 0; i<arr.length; i++){
    if (!func(newArr, arr[i].name.toLowerCase())){
        main.push(arr[i]);
    }
  }
  main.push(...newArr);

  const queries = main.map(values => getAnimeInsertQuery([
    `'${values.name}'`,
    `'${values.genre}'`,
    `'${values.type}'`,
    +values.episodes,
    +values.rating,
    +values.viewers
  ]));

  let cnt = 0;
  for (let i = 0; i<queries.length; i++){
    try{
      await pool.query(queries[i]);
    } catch (e) {
      throw e;
    }
  }
  console.log(cnt);
});

app.listen(PORT, async () => {
  await pool.query('TRUNCATE anime');
  console.log(`>>> Koa started on PORT ${PORT}`);
});
