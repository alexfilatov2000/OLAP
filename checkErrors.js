// import pool from './db/db'
//
// const getAnimeInsertQuery = (values) =>
//     `INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(',')})`;
//
//
// const check = (queries) => {
//     let list = queries.split(/[,)]/);
//     let list2 = queries.split(',');
//     let episodes = +list[list.length - 4];
//     let rating = +list[list.length - 3];
//     let viewers = +list[list.length - 2];
//
//     if (isNaN(episodes) === true){
//         list2[list2.length - 3] = 0;
//         list2[list2.length - 3] = 0
//         const elem = `${list2.join()}`;
//         pool.query(elem);
//     }
//     if (isNaN(rating) === true){
//         list2[list2.length - 2] = 0;
//         const elem = `${list2.join()}`;
//         pool.query(elem);
//         console.log(elem);
//     }
//     if (isNaN(viewers) === true){
//         list2[list2.length - 1] = 0;
//         const elem = `${list2.join()})`;
//         pool.query(elem);
//         console.log(elem)
//     }
// }
//
// module.exports = getAnimeInsertQuery;
// module.exports = check;
