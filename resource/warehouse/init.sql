create table "genres"(
    id serial primary key,
    name varchar not null unique
);

create table "types"(
    id serial primary key,
    name varchar not null unique
);

create table "animeGenres"(
    "genreId" int not null,
    "animeId" int not null,
    primary key ("genreId", "animeId")
);

create table anime(
    id serial primary key,
    name varchar not null unique,
    "typeId" int not null,
    episodes int not null,
    rating decimal (4,2) not null,
    viewers int not null
);

alter table "animeGenres" add constraint "animeGenres_fk0" foreign key ("genreId") references genres(id);
alter table "animeGenres" add constraint "animeGenres_fk1" foreign key ("animeId") references anime(id);
alter table "anime" add constraint "anime_fk0" foreign key ("typeId") references types(id);

insert into genres (name) values
    ('Drama'),
    ('Action'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Comedy'),
    ('Sports'),
    ('Romance'),
    ('Mystery');

insert into types (name) values
    ('TV'),
    ('Movie'),
    ('Music'),
    ('Music Video'),
    ('Special'),
    ('Other');