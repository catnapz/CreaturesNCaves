-- Table: public."DeviceCodes"

-- DROP TABLE public."DeviceCodes";

CREATE TABLE public."DeviceCodes"
(
    "UserCode" text COLLATE pg_catalog."default" NOT NULL,
    "DeviceCode" text COLLATE pg_catalog."default" NOT NULL,
    "SubjectId" text COLLATE pg_catalog."default",
    "ClientId" text COLLATE pg_catalog."default" NOT NULL,
    "Data" text COLLATE pg_catalog."default" NOT NULL,
    "Expiration" date NOT NULL,
    "CreationTime" date NOT NULL,
    CONSTRAINT "PK_DeviceCodes" PRIMARY KEY ("UserCode")
)

TABLESPACE pg_default;

ALTER TABLE public."DeviceCodes"
    OWNER to cnc_admin;
-- Index: IX_DeviceCodes_DeviceCode

-- DROP INDEX public."IX_DeviceCodes_DeviceCode";

CREATE UNIQUE INDEX "IX_DeviceCodes_DeviceCode"
    ON public."DeviceCodes" USING btree
    ("DeviceCode" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;