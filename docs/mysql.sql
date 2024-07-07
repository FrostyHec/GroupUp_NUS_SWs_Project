create table "User"
(
    id       serial
        primary key,
    username varchar not null,
    gender   varchar not null,
    password varchar not null
);

alter table "User"
    owner to postgres;

create table "Survey"
(
    id             serial
        primary key,
    invitationcode varchar not null
        unique,
    state          varchar
        constraint "Survey_state_check"
            check ((state)::text = ANY
                   ((ARRAY ['ready'::character varying, 'released'::character varying, 'closed'::character varying])::text[])),
    info           json,
    creator_id     integer
        references "User"
);

alter table "Survey"
    owner to postgres;

create table "Query"
(
    id      serial
        primary key,
    state   varchar
        constraint "Query_state_check"
            check ((state)::text = ANY
                   ((ARRAY ['edit'::character varying, 'done'::character varying, 'paired'::character varying])::text[])),
    temp_id integer
        references "Survey",
    info    json
);

alter table "Query"
    owner to postgres;

create table "Group"
(
    id        serial
        primary key,
    state     varchar,
    survey_id integer
        references "Survey"
);

alter table "Group"
    owner to postgres;

create table "Group_Member"
(
    group_id integer not null
        references "Group"
            on delete cascade,
    user_id  integer not null
        references "User"
            on delete cascade,
    primary key (group_id, user_id)
);

alter table "Group_Member"
    owner to postgres;


