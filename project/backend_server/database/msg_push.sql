create table user_ip
(
    uid int8 primary key,
    ip  varchar
);
create table msg_unposed
(
    message_id   int8 primary key,
    from_id      int8 not null,
    to_id        int8 not null,
    type         int4 not null,
    required_ack bool not null,
    body         json
);
create table msg_unacked (like msg_unposed including all);