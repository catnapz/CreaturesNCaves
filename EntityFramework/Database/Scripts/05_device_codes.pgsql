-- Table: public.device_codes

-- DROP TABLE public.device_codes;

CREATE TABLE public.device_codes
(
    user_code text COLLATE pg_catalog."default" NOT NULL,
    device_code text COLLATE pg_catalog."default" NOT NULL,
    subject_id text COLLATE pg_catalog."default",
    client_id text COLLATE pg_catalog."default" NOT NULL,
    creation_time text COLLATE pg_catalog."default" NOT NULL,
    expiration text COLLATE pg_catalog."default" NOT NULL,
    data text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT device_codes_pkey PRIMARY KEY (user_code)
)

TABLESPACE pg_default;

ALTER TABLE public.device_codes
    OWNER to cnc_admin;
-- Index: device_codes_device_code_index

-- DROP INDEX public.device_codes_device_code_index;

CREATE UNIQUE INDEX device_codes_device_code_index
    ON public.device_codes USING btree
    (device_code COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: device_codes_expiration_index

-- DROP INDEX public.device_codes_expiration_index;

CREATE INDEX device_codes_expiration_index
    ON public.device_codes USING btree
    (expiration COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;