-- Table: public.roles

-- DROP TABLE public.roles;

CREATE TABLE public.roles
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    normalized_name text COLLATE pg_catalog."default",
    concurrency_stamp text COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to cnc_admin;
-- Index: role_name_index

-- DROP INDEX public.role_name_index;

CREATE UNIQUE INDEX role_name_index
    ON public.roles USING btree
    (normalized_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;