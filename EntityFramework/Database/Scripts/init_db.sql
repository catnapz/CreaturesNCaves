CREATE USER cnc_admin WITH
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD 'xxxx';


CREATE DATABASE cnc
    WITH
    OWNER = cnc_admin
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT TEMPORARY, CONNECT ON DATABASE cnc TO PUBLIC;

GRANT ALL ON DATABASE cnc TO cnc_admin;

\c cnc cnc_admin;

CREATE TABLE public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to cnc_admin;

CREATE TABLE public.campaigns
(
    id SERIAL NOT NULL,
    name text COLLATE pg_catalog."default",
    user_id text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT "campaigns_users_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT campaigns_pkey PRIMARY KEY (id, user_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.campaigns
    OWNER to cnc_admin;
