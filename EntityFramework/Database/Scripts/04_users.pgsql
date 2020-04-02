-- Table: public."AspNetUsers"

-- DROP TABLE public."AspNetUsers";

CREATE TABLE public."AspNetUsers"
(
    "Id" text COLLATE pg_catalog."default" NOT NULL,
    "UserName" text COLLATE pg_catalog."default",
    "NormalizedUserName" text COLLATE pg_catalog."default",
    "Email" text COLLATE pg_catalog."default",
    "NormalizedEmail" text COLLATE pg_catalog."default",
    "PasswordHash" text COLLATE pg_catalog."default",
    "SecurityStamp" text COLLATE pg_catalog."default",
    "ConcurrencyStamp" text COLLATE pg_catalog."default",
    "PhoneNumber" text COLLATE pg_catalog."default",
    "Description" text COLLATE pg_catalog."default",
    "Name" text COLLATE pg_catalog."default",
    "EmailConfirmed" boolean NOT NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer,
    "LockoutEnd" date,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE public."AspNetUsers"
    OWNER to cnc_admin;
-- Index: EmailIndex

-- DROP INDEX public."EmailIndex";

CREATE INDEX "EmailIndex"
    ON public."AspNetUsers" USING btree
    ("NormalizedEmail" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: UserNameIndex

-- DROP INDEX public."UserNameIndex";

CREATE UNIQUE INDEX "UserNameIndex"
    ON public."AspNetUsers" USING btree
    ("NormalizedUserName" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;