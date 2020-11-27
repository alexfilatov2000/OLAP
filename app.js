import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import parse from 'csv-parser'
import fs from 'fs';
const app = new Koa();
const router = new Router();
import pool from "./db/db";
import {check, getAnimeInsertQuery} from "./checkErrors";

app.use(router.routes());

const PORT = 3000;

router.get('/', async ctx => {
    await pool.query('TRUNCATE anime')
    const data = [];

    fs.createReadStream('csv/anime.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', (row) => {
            data.push(_.pick(row, ['name', 'genre', 'type', 'episodes', 'rating', 'members']));
        })
        .on('end', async () => {
            const queries = data.map(values => getAnimeInsertQuery([
                `'${values.name}'`,
                `'${values.genre}'`,
                `'${values.type}'`,
                +values.episodes,
                +values.rating,
                +values.members
            ]));
            let cnt = 0;
            for (let i = 0; i<queries.length; i++){
                try{
                    await pool.query(queries[i])
                } catch (e) {
                    cnt++;
                    check(queries[i]);
                }
            }
            console.log(cnt);
        });

})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
