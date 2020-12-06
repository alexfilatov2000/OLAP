import pool from './db/stageDb';
import { transform } from './lib/staging/transform';
import { readdir, parseCsv } from './lib/helpers';
import { checkDuplicates, getStagingInsertQueries } from './lib/anime';

const Staging = {
	execute: async function() {
		const files = await readdir('data');
		const arr = [];

		for (const file of files) {
			const fileName = file.split('.')[0];
			const data = await parseCsv(`data/${file}`);
			const transformed = transform[fileName](data);
			arr.push(...transformed);
		}

		const queries = getStagingInsertQueries(checkDuplicates(arr));

		for (const query of queries) {
			try {
				await pool.query(query);
			} catch (err) {
				console.log(err);
			}
		}

		console.log('>>> Staging database was filled');
	}
}

export default Staging;
