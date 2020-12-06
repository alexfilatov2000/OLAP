import warehousePool from './db/warehouseDb';
import stagePool from './db/stageDb';


const Warehouse = {
	execute: async function() {
		const genresRes = await warehousePool.query('select * from genres');
		const typesRes = await warehousePool.query('select * from types');
		const animeRes = await stagePool.query('select * from anime');

		const genres = genresRes.rows;
		const types = typesRes.rows;
		const anime = animeRes.rows;

		for (let i = 0; i < anime.length; i++) {
			let correctType = false;
			for (let j = 0; j < types.length; j++) {
				if (anime[i].type === types[j].name) {
					anime[i].type = types[j].id;
					correctType = true;
				}
			}

			if (!correctType) {
				anime[i].type = -1;
			}

			const genresArr = anime[i].genre.split(', ');
			const genresIds = [];

			for (let j = 0; j < genresArr.length; j++) {
				for (let k = 0; k < genres.length; k++) {
					if (genresArr[j] === genres[k].name) {
						genresIds.push(genres[k].id);
					}
				}
			}
			anime[i].genre = [...new Set(genresIds)];
		}

		for (let i = 0; i < anime.length; i++) {
			if (anime[i].type !== -1 && anime[i].genre.length > 0) {
				anime[i].name = anime[i].name.replace(/\'/g, '\'\'');
				const res = await warehousePool.query(`insert into anime (name, "typeId", episodes, rating, viewers) values ('${anime[i].name}', ${anime[i].type}, ${anime[i].episodes}, ${anime[i].rating}, ${anime[i].viewers}) RETURNING id`);
				for (let j = 0; j < anime[i].genre.length; j++) {
					await warehousePool.query(`insert into "animeGenres" values (${anime[i].genre[j]}, ${res.rows[0].id})`)
				}
			}
		}

		console.log('>>> Warehouse database was filled');
	}
}

export default Warehouse;
