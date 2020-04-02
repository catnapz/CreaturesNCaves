-- Table: public."AspNetRoleClaims"

-- DROP TABLE public."AspNetRoleClaims";

CREATE TABLE public."AspNetRoleClaims"
(
    "Id" integer NOT NULL,
    "RoleId" text COLLATE pg_catalog."default" NOT NULL,
    "ClaimType" text COLLATE pg_catalog."default",
    "ClaimValue" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId")
        REFERENCES public."AspNetRoles" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public."AspNetRoleClaims"
    OWNER to cnc_admin;
-- Index: IX_AspNetRoleClaims_RoleId

-- DROP INDEX public."IX_AspNetRoleClaims_RoleId";

CREATE INDEX "IX_AspNetRoleClaims_RoleId"
    ON public."AspNetRoleClaims" USING btree
    ("RoleId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;