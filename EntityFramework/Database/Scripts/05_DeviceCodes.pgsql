-- Table: public."DeviceCodes"

-- DROP TABLE public."DeviceCodes";

CREATE TABLE public."DeviceCodes"
(
    "UserCode" text COLLATE pg_catalog."default" NOT NULL,
    "DeviceCode" text COLLATE pg_catalog."default" NOT NULL,
    "SubjectId" text COLLATE pg_catalog."default",
    "ClientId" text COLLATE pg_catalog."default" NOT NULL,
    "CreationTime" text COLLATE pg_catalog."default" NOT NULL,
    "Expiration" text COLLATE pg_catalog."default" NOT NULL,
    "Data" text COLLATE pg_catalog."default" NOT NULL,
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
-- Index: IX_DeviceCodes_Expiration

-- DROP INDEX public."IX_DeviceCodes_Expiration";

CREATE INDEX "IX_DeviceCodes_Expiration"
    ON public."DeviceCodes" USING btree
    ("Expiration" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;