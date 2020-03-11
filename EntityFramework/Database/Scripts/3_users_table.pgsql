-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id character varying(256) COLLATE pg_catalog."default" NOT NULL,
    username character varying(32) COLLATE pg_catalog."default" NOT NULL,
    hashed_password character(128) COLLATE pg_catalog."default" NOT NULL,
    name character varying(256) COLLATE pg_catalog."default",
    description character varying(1024) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to cnc_admin;
COMMENT ON TABLE public.users
    IS 'Collection of users';
