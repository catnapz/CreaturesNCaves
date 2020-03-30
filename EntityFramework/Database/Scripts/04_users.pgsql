-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    user_name text COLLATE pg_catalog."default",
    normalized_user_name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    normalized_email text COLLATE pg_catalog."default",
    email_confirmed integer NOT NULL,
    password_hash text COLLATE pg_catalog."default",
    security_stamp text COLLATE pg_catalog."default",
    concurrency_stamp text COLLATE pg_catalog."default",
    phone_number text COLLATE pg_catalog."default",
    phone_number_confirmed integer NOT NULL,
    two_factor_enabled integer NOT NULL,
    lockout_end text COLLATE pg_catalog."default",
    lockout_enabled integer NOT NULL,
    access_failed_count integer NOT NULL,
    description text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to cnc_admin;
-- Index: email_index

-- DROP INDEX public.email_index;

CREATE INDEX email_index
    ON public.users USING btree
    (normalized_email COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: user_name_index

-- DROP INDEX public.user_name_index;

CREATE UNIQUE INDEX user_name_index
    ON public.users USING btree
    (normalized_user_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;