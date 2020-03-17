-- Table: public."AspNetRoles"

-- DROP TABLE public."AspNetRoles";

CREATE TABLE public."AspNetRoles"
(
    "Id" text COLLATE pg_catalog."default" NOT NULL,
    "Name" text COLLATE pg_catalog."default",
    "NormalizedName" text COLLATE pg_catalog."default",
    "ConcurrencyStamp" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE public."AspNetRoles"
    OWNER to cnc_admin;
-- Index: RoleNameIndex

-- DROP INDEX public."RoleNameIndex";

CREATE UNIQUE INDEX "RoleNameIndex"
    ON public."AspNetRoles" USING btree
    ("NormalizedName" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;