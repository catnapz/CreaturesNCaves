-- Table: public.user_logins

-- DROP TABLE public.user_logins;

CREATE TABLE public.user_logins
(
    login_provider text COLLATE pg_catalog."default" NOT NULL,
    provider_key text COLLATE pg_catalog."default" NOT NULL,
    provider_display_name text COLLATE pg_catalog."default",
    user_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_logins_pkey PRIMARY KEY (login_provider, provider_key),
    CONSTRAINT user_logins_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.user_logins
    OWNER to cnc_admin;
-- Index: IX_UserLogins_UserId

-- DROP INDEX public.user_logins_user_id_index;

CREATE INDEX user_logins_user_id_index
    ON public.user_logins USING btree
    (user_id COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;