import pool from './db/db'

export const getAnimeInsertQuery = (values) =>
    `INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(',')})`;


export const check = (queries) => {
    let list = queries.split(/[,)]/);
    let episodes = +list[list.length - 4];
    let rating = +list[list.length - 3];
    let viewers = +list[list.length - 2];


    if (isNaN(episodes) === true){
        list[list.length - 4] = 0;
        const elem = `${list.join()}`.replace(/(?<=viewers),|,$/g, ")");
        pool.query(elem);
    }
    if (isNaN(rating) === true){
        list[list.length - 3] = 0;
        const elem = `${list.join()}`.replace(/(?<=viewers),|,$/g, ")");
        pool.query(elem);
        console.log(elem);
    }
    if (isNaN(viewers) === true){
        list[list.length - 2] = 0;
        const elem = `${list.join()}`.replace(/(?<=viewers),|,$/g, ")");
        pool.query(elem);
        console.log(elem)
    }
}
