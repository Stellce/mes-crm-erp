drop table if exists orders;
create table orders (
    order_id serial primary key,
    item_id int references items(item_id),
    client_id int references clients(client_id),
    item_quantity int not null,
    price decimal(10,2) not null,
    status varchar(50) not null
);