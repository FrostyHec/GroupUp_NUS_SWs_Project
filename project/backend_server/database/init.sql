create table user_table
(
    id       serial primary key,
    username varchar not null,
    password varchar not null
);

create table survey
(
    id             serial primary key,
    create_at    timestamp,
    update_at    timestamp,
    name            varchar,
    description varchar,
    status          int,
    personal_info  json,
    questions           json,
    group_restriction json,
    creator_id     integer
);

create table survey_owner(
    owner_id int8,
    survey_id int8,
    primary key (survey_id,owner_id) -- owner -> user_table.id,  survey_id -> survey.id
);
create table survey_member(
                             member_id int8,
                             survey_id int8,
                             primary key (survey_id,member_id)
);


create table query
(
    id      serial primary key,
    create_at timestamp,
    update_at timestamp,
    status   int,
    survey_id int8,
    member_id int8,
    personal_info json,
    questions_answer json
);


create table group_table
(
    id        serial primary key,
    survey_id int8
);
create table group_member(
     group_id int8,
     member_id int8,
    primary key (group_id, member_id)
);

create table announcement(
    id serial primary key,
    survey_id int8,
    survey_name int8,
    create_at timestamp,
    update_at timestamp,
    title varchar,
    description varchar
);
create table request_grouping(
    id serial primary key ,
    survey_id int8,
    from_id int8, -- creator
    to_group bool,
    to_id int8,
    create_at timestamp,
    message varchar,
    remain_required_accept int, -- 还有几个人没有accept
    status int -- 1 accepted / 2 denied / 3 wait
);
create table response_group_request(
    id serial primary key ,
    create_at timestamp not null ,
    update_at timestamp not null ,
    request_id int8 not null ,
    user_id int8 not null ,
    response_type int --1 accept, 2 denied, 3 wait[排在前面]
);