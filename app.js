import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import parse from "csv-parser";
import fs from 'fs';
import dotenv from 'dotenv';
import pg from 'pg';

const app = new Koa();
const router = new Router();

dotenv.config();

//OLAPstage
// const pool = new pg.Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
// });

const getAnimeInsertQuery = (values) => 
    `INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(', ')})`;

// pool.connect();

app.use(router.routes());

const PORT = 3000;

router.get('/', async ctx => {
    console.log(process.env.DB_USER);
    
    const data = [];
    
    fs.createReadStream('csv/anime.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', (row) => {
            data.push(_.pick(row, ['name', 'genre', 'type', 'episodes', 'rating', 'members']));
        })
        .on('end', () => {
            const queries = data.map(values => getInsertQuery([
                `"${values.name}"`,
                `"${values.genre}"`,
                `"${values.type}"`,
                +values.episodes,
                +values.rating,
                +values.members
            ]));

            console.dir(queries);
        });
})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
