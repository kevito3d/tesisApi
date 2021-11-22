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
);

create table if not exists mplants(
    id smallserial primary key ,
    names varchar (100) not null,
    phone varchar (10) not null,
    latitud varchar (15) not null,
    longuitud varchar (15) not null, 
    plant_id integer not null ,
    foreign key (plant_id) references plants(id)
);

create table if not exists mimages(
    id smallserial primary key ,
    url text not null check (url <> ''),
    mplant_id integer not null,
    foreign key (mplant_id) references mplants(id)
)