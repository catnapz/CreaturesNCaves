-- Table: public.persisted_grants

-- DROP TABLE public.persisted_grants;

CREATE TABLE public.persisted_grants
(
    key text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    subject_id text COLLATE pg_catalog."default",
    client_id text COLLATE pg_catalog."default" NOT NULL,
    creation_time text COLLATE pg_catalog."default" NOT NULL,
    expiration text COLLATE pg_catalog."default",
    data text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT persisted_grants_pkey PRIMARY KEY (key)
)

TABLESPACE pg_default;

ALTER TABLE public.persisted_grants
    OWNER to cnc_admin;
-- Index: IX_PersistedGrants_Expiration

-- DROP INDEX public.persisted_grants_expiration_index;

CREATE INDEX persisted_grants_expiration_index
    ON public.persisted_grants USING btree
    (expiration COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IX_PersistedGrants_SubjectId_ClientId_Type

-- DROP INDEX public.persisted_grants_subject_id_client_id_type_index;

CREATE INDEX persisted_grants_subject_id_client_id_type_index
    ON public.persisted_grants USING btree
    (subject_id COLLATE pg_catalog."default" ASC NULLS LAST, client_id COLLATE pg_catalog."default" ASC NULLS LAST, type COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;