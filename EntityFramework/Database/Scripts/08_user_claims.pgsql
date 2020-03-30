-- Table: public.user_claims

-- DROP TABLE public.user_claims;

CREATE TABLE public.user_claims
(
    id integer NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    claim_type text COLLATE pg_catalog."default",
    claim_value text COLLATE pg_catalog."default",
    CONSTRAINT user_claims_pkey PRIMARY KEY (id),
    CONSTRAINT user_claims_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.user_claims
    OWNER to cnc_admin;
-- Index: IX_UserClaims_UserId

-- DROP INDEX public.user_claims_user_id_index;

CREATE INDEX user_claims_user_id_index
    ON public.user_claims USING btree
    (user_id COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;