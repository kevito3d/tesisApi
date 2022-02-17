
/* 

1. Borra la DB.
2. Abre un CMD nuevo.
3. Ejecuta chcp 1252
4. Entra a psql.
5. Inserta un dato.
6. Valida en pgadmin.

 */
CREATE TABLE IF NOT exists provinces(
    id serial  primary key,
    name varchar (50)
);
CREATE TABLE IF NOT exists cantons(
    id serial  primary key,
    name varchar (50),
    idprovince integer,
    foreign key (idprovince) references provinces(id) ON DELETE CASCADE  ON UPDATE CASCADE
    
);
/* CREATE TABLE IF NOT exists parishs(
    id integer primary key ,
    name varchar (50),
    locatity varchar (25),
    idcanton integer,
    foreign key (idcanton) references cantons(id)ON DELETE CASCADE  ON UPDATE CASCADE
); */

create table if not exists plants(
    scientificname varchar (100) primary key,
    name varchar (50) ,
    description varchar not null
);

create table if not exists plantsreferences(
    scientificname varchar (100),
    locality varchar(50),
    idcanton integer,
    foreign key (idcanton) references cantons(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (scientificname) references plants(scientificname)ON DELETE CASCADE  ON UPDATE CASCADE,
    primary key (scientificname,idcanton)
);

create table if not exists users(
    ci varchar (10) primary key,
    firstname varchar (50),
    lastname varchar (50),
    email varchar (50) unique,
    phone varchar (15),
    password varchar,
    role varchar (10) default 'student' 
);


create table if not exists observations(
    id serial primary key,
    latitude varchar (15),
    longitude varchar (15),
    locality varchar(50),
    checked boolean default false,
    verified boolean default false,
    ci varchar (10) not null,
    scientificname  varchar (100)  not null,
    idcanton  integer,
    foreign key (idcanton) references cantons(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (ci) references users(ci) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (scientificname) references plants(scientificname) ON DELETE CASCADE  ON UPDATE CASCADE
);

/* create table if not exists observationsreferences(
    idobservation integer,
    idcanton integer,
    foreign key (idcanton) references cantons(id) ON DELETE CASCADE  ON UPDATE CASCADE ,
    foreign key (idobservation) references observations(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    primary key (idobservation,idcanton)
); */

create table if not exists partplants(
    id serial primary key,
    name varchar(25),
    description varchar (50),
    scientificname  varchar (100) ,
    idobservation integer ,
    foreign key (scientificname) references plants(scientificname) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (idobservation) references observations(id) ON DELETE CASCADE  ON UPDATE CASCADE
);

create table if not exists images(
    id serial primary key ,
    url text not null check (url <> ''),
    scientificname  varchar (100)  ,
    idpartplant integer ,
    idobservation integer ,
    foreign key (scientificname) references plants(scientificname) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (idpartplant) references partplants(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    foreign key (idobservation) references observations(id) ON DELETE CASCADE  ON UPDATE CASCADE
);


insert into provinces (name) values('Azuay');
insert into provinces (name) values('Bolívar');
insert into provinces (name) values('Cañar');
insert into provinces (name) values('Carchi');
insert into provinces (name) values('Chimborazo');
insert into provinces (name) values('Cotopaxi');
insert into provinces (name) values('El Oro');
insert into provinces (name) values('Esmeraldas');
insert into provinces (name) values('Galápagos');
insert into provinces (name) values('Guayas');
insert into provinces (name) values('Imbabura');
insert into provinces (name) values('Loja');
insert into provinces (name) values('Los Ríos');
insert into provinces (name) values('Manabí');
insert into provinces (name) values('Morona-Santiago');
insert into provinces (name) values('Napo');
insert into provinces (name) values('Orellana');
insert into provinces (name) values('Pastaza');
insert into provinces (name) values('Pichincha');
insert into provinces (name) values('Santa Elena');
insert into provinces (name) values('Santo Domingo de los Tsáchilas');
insert into provinces (name) values('Sucumbíos');
insert into provinces (name) values('Tungurahua');
insert into provinces (name) values('Zamora-Chinchipe');









        insert into cantons (name, idprovince) values('San Lorenzo', 8);
        insert into cantons (name, idprovince) values('Eloy Alfaro', 8);
        insert into cantons (name, idprovince) values('Rioverde', 8);
        insert into cantons (name, idprovince) values('Esmeraldas', 8);
        insert into cantons (name, idprovince) values('Muisne', 8);
        insert into cantons (name, idprovince) values('Atacames', 8);
        insert into cantons (name, idprovince) values('Quininde', 8);
        insert into cantons (name, idprovince) values('Tulcan', 4);
        insert into cantons (name, idprovince) values('Mira', 4);
        insert into cantons (name, idprovince) values('Espejo', 4);
        insert into cantons (name, idprovince) values('Montufar', 4);
        insert into cantons (name, idprovince) values('San Pedro de Huaca', 4);
        -- insert into cantons (name, idprovince) values('Bolivar (Carchi)', 4);
        insert into cantons (name, idprovince) values('Bolivar', 4);
        insert into cantons (name, idprovince) values('Montalvo', 6);
        insert into cantons (name, idprovince) values('Sigchos', 6);
        insert into cantons (name, idprovince) values('La Mana', 6);
        insert into cantons (name, idprovince) values('Latacunga', 6);
        insert into cantons (name, idprovince) values('Saquisili', 6);
        insert into cantons (name, idprovince) values('Pujili', 6);
        insert into cantons (name, idprovince) values('Pangua', 6);
        insert into cantons (name, idprovince) values('Salcedo', 2);
        insert into cantons (name, idprovince) values('Guaranda', 2);
        insert into cantons (name, idprovince) values('Las Naves', 2);
        insert into cantons (name, idprovince) values('Echeandia', 2);
        insert into cantons (name, idprovince) values('Caluma', 2);
        insert into cantons (name, idprovince) values('Chimbo', 2);
        insert into cantons (name, idprovince) values('San Miguel', 2);
        insert into cantons (name, idprovince) values('Quero', 5);
        insert into cantons (name, idprovince) values('Guano', 5);
        insert into cantons (name, idprovince) values('Penipe', 5);
        insert into cantons (name, idprovince) values('Riobamba', 5);
        insert into cantons (name, idprovince) values('Colta', 5);
        insert into cantons (name, idprovince) values('Chambo', 5);
        insert into cantons (name, idprovince) values('Pallatanga', 5);
        insert into cantons (name, idprovince) values('Guamote', 5);
        insert into cantons (name, idprovince) values('Alausi', 5);
        insert into cantons (name, idprovince) values('Cumanda', 5);
        insert into cantons (name, idprovince) values('Salinas', 3);
        insert into cantons (name, idprovince) values('La Troncal', 3);
        insert into cantons (name, idprovince) values('Cañar', 3);
        insert into cantons (name, idprovince) values('Suscal', 3);
        insert into cantons (name, idprovince) values('El Tambo', 3);
        insert into cantons (name, idprovince) values('Azogues', 3);
        insert into cantons (name, idprovince) values('Biblian', 3);
        insert into cantons (name, idprovince) values('Deleg', 1);
        insert into cantons (name, idprovince) values('Sevilla de Oro', 1);
        insert into cantons (name, idprovince) values('Paute', 1);
        insert into cantons (name, idprovince) values('Guachapala', 1);
        insert into cantons (name, idprovince) values('El Pan', 1);
        insert into cantons (name, idprovince) values('Gualaceo', 1);
        insert into cantons (name, idprovince) values('Chordeleg', 1);
        insert into cantons (name, idprovince) values('Sigsig', 1);
        insert into cantons (name, idprovince) values('Cuenca', 1);
        insert into cantons (name, idprovince) values('Santa Isabel', 1);
        insert into cantons (name, idprovince) values('Pucara', 1);
        insert into cantons (name, idprovince) values('Camilo Ponce Enriquez', 1);
        insert into cantons (name, idprovince) values('San Fernando', 1);
        insert into cantons (name, idprovince) values('Giron', 1);
        insert into cantons (name, idprovince) values('Nabon', 1);
        insert into cantons (name, idprovince) values('Oña', 7);
        insert into cantons (name, idprovince) values('El Guabo', 7);
        insert into cantons (name, idprovince) values('Machala', 7);
        insert into cantons (name, idprovince) values('Pasaje', 7);
        insert into cantons (name, idprovince) values('Chilla', 7);
        insert into cantons (name, idprovince) values('Zaruma', 7);
        insert into cantons (name, idprovince) values('Santa Rosa', 7);
        insert into cantons (name, idprovince) values('Atahualpa', 7);
        insert into cantons (name, idprovince) values('Arenillas', 7);
        insert into cantons (name, idprovince) values('Huaquillas', 7);
        insert into cantons (name, idprovince) values('Las Lajas', 7);
        insert into cantons (name, idprovince) values('Marcabeli', 7);
        insert into cantons (name, idprovince) values('Balsas', 7);
        insert into cantons (name, idprovince) values('Piñas', 7);
        insert into cantons (name, idprovince) values('Chinchipe', 9);
        insert into cantons (name, idprovince) values('Isabela', 9);
        insert into cantons (name, idprovince) values('San Cristobal', 9);
        insert into cantons (name, idprovince) values('Gualaquiza', 10);
        insert into cantons (name, idprovince) values('El Empalme', 10);
        insert into cantons (name, idprovince) values('Balzar', 10);
        insert into cantons (name, idprovince) values('Colimes', 10);
        insert into cantons (name, idprovince) values('Palestina', 10);
        insert into cantons (name, idprovince) values('Santa Lucia', 10);
        insert into cantons (name, idprovince) values('Pedro Carbo', 10);
        insert into cantons (name, idprovince) values('Isidro Ayora', 10);
        insert into cantons (name, idprovince) values('Lomas de Sargentillo', 10);
        insert into cantons (name, idprovince) values('Nobol', 10);
        insert into cantons (name, idprovince) values('Daule', 10);
        insert into cantons (name, idprovince) values('Salitre', 10);
        insert into cantons (name, idprovince) values('Samborondon', 10);
        insert into cantons (name, idprovince) values('Yaguachi', 10);
        insert into cantons (name, idprovince) values('Alfredo Baquerizo Moreno', 10);
        insert into cantons (name, idprovince) values('Milagro', 10);
        insert into cantons (name, idprovince) values('Simon Bolivar', 10);
        insert into cantons (name, idprovince) values('Naranjito', 10);
        insert into cantons (name, idprovince) values('General Antonio Elizalde', 10);
        insert into cantons (name, idprovince) values('Coronel Marcelino Maridueña', 10);
        insert into cantons (name, idprovince) values('El Triunfo', 10);
        insert into cantons (name, idprovince) values('Duran', 10);
        insert into cantons (name, idprovince) values('Guayaquil', 10);
        insert into cantons (name, idprovince) values('Playas', 10);
        insert into cantons (name, idprovince) values('Naranjal', 10);
        insert into cantons (name, idprovince) values('Ibarra', 11);
        insert into cantons (name, idprovince) values('San Miguel de Urcuqui', 11);
        insert into cantons (name, idprovince) values('Cotacachi', 11);
        insert into cantons (name, idprovince) values('Antonio Ante', 11);
        insert into cantons (name, idprovince) values('Otavalo', 11);
        insert into cantons (name, idprovince) values('Pimampiro', 11);
        insert into cantons (name, idprovince) values('Portovelo', 12);
        insert into cantons (name, idprovince) values('Saraguro', 12);
        insert into cantons (name, idprovince) values('Loja', 12);
        insert into cantons (name, idprovince) values('Chaguarpamba', 12);
        -- insert into cantons (name, idprovince) values('Olmedo (Loja)', 12); 
        insert into cantons (name, idprovince) values('Olmedo', 12); 
        insert into cantons (name, idprovince) values('Catamayo', 12);
        insert into cantons (name, idprovince) values('Paltas', 12);
        insert into cantons (name, idprovince) values('Puyango', 12);
        insert into cantons (name, idprovince) values('Pindal', 12);
        insert into cantons (name, idprovince) values('Celica', 12);
        insert into cantons (name, idprovince) values('Zapotillo', 12);
        insert into cantons (name, idprovince) values('Macara', 12);
        insert into cantons (name, idprovince) values('Sozoranga', 12);
        insert into cantons (name, idprovince) values('Calvas', 12);
        insert into cantons (name, idprovince) values('Gonzanama', 12);
        insert into cantons (name, idprovince) values('Quilanga', 12);
        insert into cantons (name, idprovince) values('Buena Fe', 13);
        insert into cantons (name, idprovince) values('Valencia', 13);
        insert into cantons (name, idprovince) values('Quevedo', 13);
        insert into cantons (name, idprovince) values('Quinsaloma', 13);
        insert into cantons (name, idprovince) values('Palenque', 13);
        insert into cantons (name, idprovince) values('Mocache', 13);
        insert into cantons (name, idprovince) values('Ventanas', 13);
        insert into cantons (name, idprovince) values('Vinces', 13);
        insert into cantons (name, idprovince) values('Baba', 13);
        insert into cantons (name, idprovince) values('Puebloviejo', 13);
        insert into cantons (name, idprovince) values('Urdaneta', 13);
        insert into cantons (name, idprovince) values('Babahoyo', 13);
        insert into cantons (name, idprovince) values('Pedernales', 14);
        insert into cantons (name, idprovince) values('Chone', 14);
        insert into cantons (name, idprovince) values('Flavio Alfaro', 14);
        insert into cantons (name, idprovince) values('El Carmen', 14);
        insert into cantons (name, idprovince) values('Jama', 14);
        insert into cantons (name, idprovince) values('San Vicente', 14);
        insert into cantons (name, idprovince) values('Sucre', 14);
        insert into cantons (name, idprovince) values('Tosagua', 14);
        insert into cantons (name, idprovince) values('Rocafuerte', 14);
        insert into cantons (name, idprovince) values('Junin', 14);
        -- insert into cantons (name, idprovince) values('Bolivar (Manabi)', 14);
        insert into cantons (name, idprovince) values('Bolivar', 14);
        insert into cantons (name, idprovince) values('Pichincha', 14);
        insert into cantons (name, idprovince) values('Portoviejo', 14);
        insert into cantons (name, idprovince) values('Jaramijo', 14);
        insert into cantons (name, idprovince) values('Manta', 14);
        insert into cantons (name, idprovince) values('Montecristi', 14);
        insert into cantons (name, idprovince) values('Santa Ana', 14);
        insert into cantons (name, idprovince) values('Jipijapa', 14);
        insert into cantons (name, idprovince) values('Veinticuatro de Mayo', 14);
        -- insert into cantons (name, idprovince) values('Olmedo (Manabi)', 14);
        insert into cantons (name, idprovince) values('Olmedo', 14);
        insert into cantons (name, idprovince) values('Puerto Lopez', 14);
        insert into cantons (name, idprovince) values('Pajan', 14);
        insert into cantons (name, idprovince) values('Chunchi', 15);
        insert into cantons (name, idprovince) values('Palora', 15);
        insert into cantons (name, idprovince) values('Pablo Sexto', 15);
        insert into cantons (name, idprovince) values('Huamboya', 15);
        insert into cantons (name, idprovince) values('Morona', 15);
        insert into cantons (name, idprovince) values('Taisha', 15);
        insert into cantons (name, idprovince) values('Sucua', 15);
        insert into cantons (name, idprovince) values('Santiago', 15);
        insert into cantons (name, idprovince) values('Logroño', 15);
        insert into cantons (name, idprovince) values('Tiwintza', 15);
        insert into cantons (name, idprovince) values('Limon Indanza', 15);
        insert into cantons (name, idprovince) values('San Juan Bosco', 15);
        insert into cantons (name, idprovince) values('El Chaco', 16);
        insert into cantons (name, idprovince) values('Quijos', 16);
        insert into cantons (name, idprovince) values('Archidona', 16);
        insert into cantons (name, idprovince) values('Tena', 16);
        insert into cantons (name, idprovince) values('Carlos Julio Arosemena Tola', 16);
        insert into cantons (name, idprovince) values('Loreto', 17);
        insert into cantons (name, idprovince) values('Francisco de Orellana', 17);
        insert into cantons (name, idprovince) values('La Joya de los Sachas', 17);
        insert into cantons (name, idprovince) values('Aguarico', 17);
        insert into cantons (name, idprovince) values('Mera', 18);
        insert into cantons (name, idprovince) values('Santa Clara', 18);
        insert into cantons (name, idprovince) values('Arajuno', 18);
        insert into cantons (name, idprovince) values('Pastaza', 18);
        insert into cantons (name, idprovince) values('Puerto Quito', 19);
        insert into cantons (name, idprovince) values('Pedro Vicente Maldonado', 19);
        insert into cantons (name, idprovince) values('San Miguel de Los Bancos', 19);
        insert into cantons (name, idprovince) values('Distrito Metropolitano de Quito', 19);
        insert into cantons (name, idprovince) values('Pedro Moncayo', 19);
        insert into cantons (name, idprovince) values('Cayambe', 19);
        insert into cantons (name, idprovince) values('Rumiñahui', 19);
        insert into cantons (name, idprovince) values('Mejia', 19);
        insert into cantons (name, idprovince) values('La Concordia', 21);
        insert into cantons (name, idprovince) values('Santo Domingo', 21);
        insert into cantons (name, idprovince) values('Sucumbios', 22);
        insert into cantons (name, idprovince) values('Gonzalo Pizarro', 22);
        insert into cantons (name, idprovince) values('Cascales', 22);
        insert into cantons (name, idprovince) values('Lago Agrio', 22);
        insert into cantons (name, idprovince) values('Putumayo', 22);
        insert into cantons (name, idprovince) values('Cuyabeno', 22);
        insert into cantons (name, idprovince) values('Shushufindi', 22);
        insert into cantons (name, idprovince) values('Chillanes', 23);
        insert into cantons (name, idprovince) values('Ambato', 23);
        insert into cantons (name, idprovince) values('Pillaro', 23);
        insert into cantons (name, idprovince) values('Patate', 23);
        insert into cantons (name, idprovince) values('Baños', 23);
        insert into cantons (name, idprovince) values('Pelileo', 23);
        insert into cantons (name, idprovince) values('Cevallos', 23);
        insert into cantons (name, idprovince) values('Tisaleo', 23);
        insert into cantons (name, idprovince) values('Mocha', 23);
        insert into cantons (name, idprovince) values('Espindola', 24);
        insert into cantons (name, idprovince) values('Yacuambi', 24);
        insert into cantons (name, idprovince) values('Yantzaza', 24);
        insert into cantons (name, idprovince) values('El Pangui', 24);
        insert into cantons (name, idprovince) values('Zamora', 24);
        insert into cantons (name, idprovince) values('Centinela del Condor', 24);
        insert into cantons (name, idprovince) values('Paquisha', 24);
        insert into cantons (name, idprovince) values('Nangaritza', 24);
        insert into cantons (name, idprovince) values('Palanda', 24);
        insert into cantons (name, idprovince) values('Balao',  20);
        insert into cantons (name, idprovince) values('Santa Elena', 20);
        insert into cantons (name, idprovince) values('La Libertad', 20);
        
        
        insert into cantons (name, idprovince) values('', 1);
        insert into cantons (name, idprovince) values('', 2);
        insert into cantons (name, idprovince) values('', 3);
        insert into cantons (name, idprovince) values('', 4);
        insert into cantons (name, idprovince) values('', 5);
        insert into cantons (name, idprovince) values('', 6);
        insert into cantons (name, idprovince) values('', 7);
        insert into cantons (name, idprovince) values('', 8);
        insert into cantons (name, idprovince) values('', 9);
        insert into cantons (name, idprovince) values('', 10);
        insert into cantons (name, idprovince) values('', 11);
        insert into cantons (name, idprovince) values('', 12);
        insert into cantons (name, idprovince) values('', 13);
        insert into cantons (name, idprovince) values('', 14);
        insert into cantons (name, idprovince) values('', 15);
        insert into cantons (name, idprovince) values('', 16);
        insert into cantons (name, idprovince) values('', 17);
        insert into cantons (name, idprovince) values('', 18);
        insert into cantons (name, idprovince) values('', 19);
        insert into cantons (name, idprovince) values('', 20);
        insert into cantons (name, idprovince) values('', 21);
        insert into cantons (name, idprovince) values('', 22);
        insert into cantons (name, idprovince) values('', 23);
        insert into cantons (name, idprovince) values('', 24);

