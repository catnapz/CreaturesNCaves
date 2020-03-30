-- Table: public.campaigns

-- DROP TABLE public.campaigns;

CREATE TABLE public.campaigns
(
    campaign_id text COLLATE pg_catalog."default" NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT campaign_id PRIMARY KEY (campaign_id),
    CONSTRAINT campaigns_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.campaigns
    OWNER to cnc_admin;
