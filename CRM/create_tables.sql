drop table if exists clients;
create table clients (
    client_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null
);