CREATE TABLE IF NOT exists provinces(
    id integer primary key,
    name varchar (25)
);
CREATE TABLE IF NOT exists cantons(
    id integer primary key,
    name varchar (25),
    idprovince integer,
    foreign key (idprovince) references provinces(id)

);
CREATE TABLE IF NOT exists parishs(
    id integer primary key,
    name varchar (25),
    idcanton integer,
    foreign key (idcanton) references cantons(id)
);

create table if not exists plants(
    scientificname varchar (100) primary key,
    name varchar (50) ,
    description varchar not null,
    commonplace varchar (50)

);

create table if not exists plantsreferences(
    scientificname varchar (100),
    idparish integer,
    foreign key (idparish) references parishs(id),
    foreign key (scientificname) references plants(scientificname),
    primary key (scientificname,idparish)
);

create table if not exists users(
    ci varchar (10) primary key,
    firstname varchar (50),
    lastname varchar (50),
    email varchar (50),
    phone varchar (15),
    password varchar,
    role varchar (10) 
);


create table if not exists observations(
    id serial primary key,
    latitude varchar (15) ,
    longitude varchar (15),
    checked boolean default false,
    verified boolean default false,
    ci varchar (10) not null,
    scientificname  varchar (100)  not null,
    foreign key (ci) references users(ci),
    foreign key (scientificname) references plants(scientificname)
);

create table if not exists observationsreferences(
    idobservation integer,
    idparish integer,
    foreign key (idparish) references parishs(id),
    foreign key (idobservation) references observations(id),
    primary key (idobservation,idparish)
);

create table if not exists partplants(
    id serial primary key,
    name varchar(25),
    description varchar (50),
    scientificname  varchar (100) ,
    idobservation integer ,
    foreign key (scientificname) references plants(scientificname),
    foreign key (idobservation) references observations(id)
);

create table if not exists images(
    id serial primary key ,
    url text not null check (url <> ''),
    scientificname  varchar (100)  ,
    idpartplant integer ,
    idobservation integer ,
    foreign key (scientificname) references plants(scientificname),
    foreign key (idpartplant) references partplants(id),
    foreign key (idobservation) references observations(id)
);