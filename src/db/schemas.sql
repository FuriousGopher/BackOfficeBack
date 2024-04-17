create table admin
(
    id             serial
        constraint "PK_e032310bcef831fb83101899b10"
            primary key,
    email          varchar(255)                           not null,
    "passwordHash" varchar(255)                           not null,
    created_at     timestamp with time zone default now() not null,
    updated_at     timestamp with time zone default now() not null,
    deleted_at     timestamp with time zone
);

alter table admin
    owner to atfxhdou;

create index admin_created_at_index
    on admin (created_at);

create table customers
(
    id         serial
        constraint "PK_133ec679a801fab5e070f73d3ea"
            primary key,
    name       varchar(255)                           not null,
    email      varchar(50)                            not null
        constraint "UQ_8536b8b85c06969f84f0c098b03"
            unique,
    vat_number varchar(20)                            not null
        constraint "UQ_44a550b3477c2ee717db78b2d9b"
            unique,
    deleted_at timestamp,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

alter table customers
    owner to atfxhdou;

create table site
(
    id           serial
        constraint "PK_635c0eeabda8862d5b0237b42b4"
            primary key,
    name         varchar(100)                           not null,
    coordinates  varchar(255)                           not null,
    address      varchar(255)                           not null,
    post_code    varchar(20)                            not null,
    created_at   timestamp with time zone default now() not null,
    updated_at   timestamp with time zone default now() not null,
    deleted_at   timestamp with time zone,
    "customerId" integer
        constraint "FK_7597068f7be20d82105df08eeb5"
            references customers
);

alter table site
    owner to atfxhdou;

create table meter
(
    id                serial
        constraint "PK_6a2a722edc5f966fa3562638f91"
            primary key,
    name              varchar(100)                           not null,
    serial_number     varchar(255)                           not null,
    installation_date timestamp                              not null,
    created_at        timestamp with time zone default now() not null,
    updated_at        timestamp with time zone default now() not null,
    deleted_at        timestamp with time zone,
    "siteId"          integer
        constraint "FK_1404df0f1e165510fa6a888b59d"
            references site
);

alter table meter
    owner to atfxhdou;

create table circuit
(
    id                serial
        constraint "PK_16d20c94e486b3613872aa43cad"
            primary key,
    name              varchar(100)                           not null,
    is_main           boolean                                not null,
    installation_date timestamp with time zone               not null,
    created_at        timestamp with time zone default now() not null,
    updated_at        timestamp with time zone default now() not null,
    deleted_at        timestamp with time zone,
    "meterId"         integer
        constraint "FK_cd8a762579074d50df27a044b09"
            references meter
);

alter table circuit
    owner to atfxhdou;

create index circuit_created_at_index
    on circuit (created_at);

create index meter_created_at_index
    on meter (created_at);

create index site_created_at_index
    on site (created_at);

create index customer_created_at_index
    on customers (created_at);

