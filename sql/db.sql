create table if not exists plants(
    id smallserial primary key ,
    scientific_name varchar (100) UNIQUE,
    name varchar (50),
    descripcion text

);

create table if not exists images(
    id smallserial primary key ,
    url text not null check (url <> ''),
    plantId integer references plants(id)
)