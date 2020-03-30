-- Table: public.user_roles

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles
(
    user_id text COLLATE pg_catalog."default" NOT NULL,
    role_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT user_roles_roles_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_roles_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.user_roles
    OWNER to cnc_admin;
-- Index: IX_UserRoles_RoleId

-- DROP INDEX public.user_roles_role_id_index;

CREATE INDEX user_roles_role_id_index
    ON public.user_roles USING btree
    (role_id COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;