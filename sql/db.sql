create table if not exists plants(
    scientificname varchar (100) primary key,
    name varchar (50) ,
    description varchar not null,
    commonplace varchar (50)

);

create table if not exists users(
    ci varchar (10) primary key,
    firstname varchar (50),
    lastname varchar (50),
    email varchar (50),
    phone varchar (15),
    password varchar ,
)


create table if not exists observations(
    id serial primary key,
    locale varchar (50),
    checked boolean default false,
    verified boolean default false,
    ci varchar (10) not null,
    scientificname  varchar (100)  not null,
    foreign key (ci) references users(ci),
    foreign key (scientificname) references plants(scientificname),
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
    foreign key (scientificname) references plants(scientificname),
    foreign key (idpartplant) references partplants(id)
);




