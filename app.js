import Koa from 'koa';
import Router from 'koa-router';
import parse from "csv-parser";
import fs from 'fs';
const app = new Koa();
const router = new Router();
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

//OLAPstage
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
});


pool.connect();
app.use(router.routes());
const PORT = 3000;
router.get('/',async ctx =>{
    console.log(process.env.DB_USER);
    let csvData=[];
    fs.createReadStream('csv/anime.csv')
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvRow) {
            //console.log(csvRow);

            csvData.push(csvRow);

        })
        .on('end',function() {
            //do something with csvData
            let result = csvData.map(anime => ({ name: anime.name, genre: anime.genre,
                type: anime.type, episodes: anime.episodes,rating: anime.rating,members:anime.members}));
            console.log(result);
        });
    await pool.query(`INSERT INTO anime (name,genre,type,episodes,rating,viewers)
    VALUES ('name','genre','type',1,1,1)`);
})

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
