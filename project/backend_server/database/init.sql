create table users
(
    id       serial primary key,
    name     varchar not null,
    password varchar not null
);

insert into users (name, password) values ('user1', 'password1');