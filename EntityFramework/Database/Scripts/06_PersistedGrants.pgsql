-- Table: public."PersistedGrants"

-- DROP TABLE public."PersistedGrants";

CREATE TABLE public."PersistedGrants"
(
    "Key" text COLLATE pg_catalog."default" NOT NULL,
    "Type" text COLLATE pg_catalog."default" NOT NULL,
    "SubjectId" text COLLATE pg_catalog."default",
    "ClientId" text COLLATE pg_catalog."default" NOT NULL,
    "CreationTime" text COLLATE pg_catalog."default" NOT NULL,
    "Expiration" text COLLATE pg_catalog."default",
    "Data" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_PersistedGrants" PRIMARY KEY ("Key")
)

TABLESPACE pg_default;

ALTER TABLE public."PersistedGrants"
    OWNER to cnc_admin;
-- Index: IX_PersistedGrants_Expiration

-- DROP INDEX public."IX_PersistedGrants_Expiration";

CREATE INDEX "IX_PersistedGrants_Expiration"
    ON public."PersistedGrants" USING btree
    ("Expiration" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IX_PersistedGrants_SubjectId_ClientId_Type

-- DROP INDEX public."IX_PersistedGrants_SubjectId_ClientId_Type";

CREATE INDEX "IX_PersistedGrants_SubjectId_ClientId_Type"
    ON public."PersistedGrants" USING btree
    ("SubjectId" COLLATE pg_catalog."default" ASC NULLS LAST, "ClientId" COLLATE pg_catalog."default" ASC NULLS LAST, "Type" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;