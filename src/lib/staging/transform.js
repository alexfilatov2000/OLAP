import _ from 'lodash';

export const transform = {};

const escapeColon = val => val.replace(/\'/g, '\'\'');

const pickAttributes = ['name', 'genre', 'type', 'episodes', 'rating', 'viewers', 'table'];

transform['1'] = data => data
  .map(item => {
    item.name = escapeColon(item.name);
    item.episodes = +item.episodes;
    item.rating = +item.rating;
    item.members = +item.members;
    item.table = 1;
    return item;
  })
  .filter(({ episodes, rating }) =>
    !isNaN(episodes) &&
    !isNaN(rating)
  )
  .map(item => {
    isNaN(item.members) ? item.viewers = 0 : item.viewers = item.members;
    return _.pick(item, pickAttributes);
  });

transform['2'] = data => data
  .map(item => {
    item.episodes = +item.eps;
    item.rating = +(item.rating * 2).toFixed(2);
    item.watched = +item.watched;
    item.name = escapeColon(item.title);
    item.genre = item.tags.replace(/[\[\]']/g, '');
    item.type = item.mediaType;
    item.table = 2;
    return item;
  })
  .filter(({ episodes, rating }) =>
    !isNaN(episodes) &&
    !isNaN(rating)
  )
  .map(item => {
    isNaN(item.watched) ? item.viewers = 0 : item.viewers = item.watched;
    return _.pick(item, pickAttributes);
  });
