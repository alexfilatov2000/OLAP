import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import parse from 'csv-parser'
import fs from 'fs';
import dotenv from 'dotenv';
import pg from "pg";
const app = new Koa();
const router = new Router();

dotenv.config();
app.use(router.routes());

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
});
pool.connect();

const PORT = 3000;

const getAnimeInsertQuery = (values) =>
    `INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(',')})`;


const check = (queries) => {
    let list = queries.split(/[,)]/);
    let list2 = queries.split(',');
    let episodes = +list[list.length - 4];
    let rating = +list[list.length - 3];
    let viewers = +list[list.length - 2];

    if (isNaN(episodes) === true){
        list2[list2.length - 3] = 0;
        list2[list2.length - 3] = 0
        const elem = `${list2.join()}`;
        pool.query(elem);
    }
    if (isNaN(rating) === true){
        list2[list2.length - 2] = 0;
        const elem = `${list2.join()}`;
        pool.query(elem);
        console.log(elem);
    }
    if (isNaN(viewers) === true){
        list2[list2.length - 1] = 0;
        const elem = `${list2.join()})`;
        pool.query(elem);
        console.log(elem)
    }
}

router.get('/', async ctx => {
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
