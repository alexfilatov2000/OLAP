create table anime(
    id serial primary key,
    name varchar,
    genre varchar, -- concat arrays
    type varchar, -- priority (from dataset 1)
    episodes int, -- priority (from dataset 1)
    rating decimal(4,2), -- average (from 0 to 10)
    viewers int -- sum
);