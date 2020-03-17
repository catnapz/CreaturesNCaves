-- Table: public.campaigns

-- DROP TABLE public.campaigns;

CREATE TABLE public.campaigns
(
    campaign_id character varying(256) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(256) COLLATE pg_catalog."default" NOT NULL,
    name character varying(256) COLLATE pg_catalog."default",
    description character varying(1024) COLLATE pg_catalog."default",
    CONSTRAINT campaign_id PRIMARY KEY (campaign_id),
    CONSTRAINT users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.campaigns
    OWNER to cnc_admin;
