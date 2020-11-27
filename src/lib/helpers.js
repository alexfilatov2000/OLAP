import fs from 'fs';
import util from 'util';
import parse from 'csv-parser';

export const readdir = util.promisify(fs.readdir);

export function parseCsv(path) {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
    .pipe(parse({ delimiter: ',' }))
    .on('data', row => {
      data.push(row);
    })
    .on('end', () => resolve(data));
  });
}
