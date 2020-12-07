import _ from 'lodash';
import warehousePool from './db/warehouseDb';
import stagePool from './db/stageDb';
import {
	getAnimeWarehouseInsertQuery,
	getGenreWarehouseInsertQuery
} from './lib/anime';

const Warehouse = {
	execute: async function() {
		const { rows: genres } = await warehousePool.query('select * from genres');
		const { rows: types } = await warehousePool.query('select * from types');
		const { rows: anime } = await stagePool.query('select * from anime');

		const animeFiltered = anime
			.map(anime => {
				const index = _.findIndex(types, ({ name }) => anime.type === name);
				anime.typeId = types[index] && types[index].id
					? types[index].id
					: -1;
				return anime;
			})
			.filter(anime => anime.typeId >= 0)
			.map(anime => {
				const genresIds = anime.genre
					.split(', ')
					.map(genre => {
						const index = _.findIndex(genres, ({ name }) => genre === name);
						return genres[index] && genres[index].id
							? genres[index].id
							: -1;
					})
					.filter(genreId => genreId >= 0);
				anime.genresIds = [...new Set(genresIds)];
				anime.name = anime.name.replace(/\'/g, '\'\'');
				return anime;
			});

		await Promise.all(animeFiltered.map(async anime => {
			let animeId;
			try {
				const res = await warehousePool.query(getAnimeWarehouseInsertQuery(anime));
				animeId = res.rows[0].id;
			} catch (err) {
				console.error(err);
			}
			
			for (const genreId of anime.genresIds) {
				try {
					await warehousePool.query(getGenreWarehouseInsertQuery({
						genre: genreId,
						anime: animeId
					}));
				} catch (err) {
					console.error(err);
				}
			}
		}));

		console.log('>>> Warehouse database was filled');
	}
}

export default Warehouse;
