import _ from 'lodash';

export const transform = {};

transform['1'] = data => data
  .map(item => {
    item.episodes = +item.episodes;
    item.rating = +item.rating;
    item.members = +item.members;
    return item;
  })
  .filter(({ episodes, rating }) =>
    !isNaN(episodes) &&
    !isNaN(rating)
  )
  .map(item => {
    isNaN(item.members) ? item.viewers = 0 : item.viewers = item.members;
    return _.pick(item, ['name', 'genre', 'type', 'episodes', 'rating', 'viewers']);
  });