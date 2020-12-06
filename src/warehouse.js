const Warehouse = {
	execute: async function() {
		/*
		 * 1. Считываем с БД Warehouse genres, types
		 * 2. Считываем с БД Staging anime
		 * 3. Итерируешься по anime:
		 * 3.1 Смотришь type, если его нет в тех что считаны в п.1 -> пропускаем значение. Если есть - подменяем на id
		 * 3.2 Смотришь genres, оставляешь только те что есть в genres. Добавляешь объекту anime поле genresIds в формате [id1, id2, ...]
		 * 3.3 insert into anime ...; insert into "animeGenres" (...) values (animeId, genreId), (...), ...
		 */
	}
}

export default Warehouse;
