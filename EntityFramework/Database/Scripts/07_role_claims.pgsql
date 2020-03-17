-- Table: public.role_claims

-- DROP TABLE public.role_claims;

CREATE TABLE public.role_claims
(
    id integer NOT NULL,
    role_id text COLLATE pg_catalog."default" NOT NULL,
    claim_type text COLLATE pg_catalog."default",
    claim_value text COLLATE pg_catalog."default",
    CONSTRAINT role_claims_pkey PRIMARY KEY (id),
    CONSTRAINT role_claims_roles_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.role_claims
    OWNER to cnc_admin;
-- Index: IX_RoleClaims_RoleId

-- DROP INDEX public.role_claims_role_id_index;

CREATE INDEX role_claims_role_id_index
    ON public.role_claims USING btree
    (role_id COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;