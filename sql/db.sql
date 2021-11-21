create table if not exists plants(
    id smallserial primary key ,
    scientific_name varchar (100) not null UNIQUE,
    name varchar (50),
    description text

);

create table if not exists images(
    id smallserial primary key ,
    url text not null check (url <> ''),
    plant_id integer not null,
    foreign key (plant_id) references plants(id)
)