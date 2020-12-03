const getAnimeInsertQuery = values =>
		`INSERT INTO anime (name, genre, type, episodes, rating, viewers) VALUES (${values.join(',')})`;
		
export const getStagingInsertQueries = (arr) =>
	arr.map(values => getAnimeInsertQuery([
		`'${values.name}'`,
		`'${values.genre}'`,
		`'${values.type}'`,
		+values.episodes,
		+values.rating,
		+values.viewers
	]));

export function checkDuplicates(arr) {
	const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].processed) { continue; }
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].name.toLowerCase() === arr[j].name.toLowerCase()) {
        arr[i].rating = +((arr[i].rating + arr[j].rating) / 2).toFixed(2);
				arr[i].viewers = arr[i].viewers + arr[j].viewers;
				arr[i].genre = arr[i].genre + ',' + arr[j].genre;
				arr[j].processed = true;
      }
		}
		newArr.push(arr[i]);
	}
	return newArr;
}