-- Table: public.user_tokens

-- DROP TABLE public.user_tokens;

CREATE TABLE public.user_tokens
(
    user_id text COLLATE pg_catalog."default" NOT NULL,
    login_provider text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    value text COLLATE pg_catalog."default",
    CONSTRAINT user_tokens_pkey PRIMARY KEY (user_id, login_provider, name),
    CONSTRAINT user_tokens_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.user_tokens
    OWNER to cnc_admin;