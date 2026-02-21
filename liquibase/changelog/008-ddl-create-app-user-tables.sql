--liquibase Formatted SQL

--changeset lisandro.ortega:app_user_status.001.1 context:dev,qa,prod
--comment: Create app_user_status table

CREATE TABLE if not exists public.app_user_status (
	id serial4 NOT NULL,
	code varchar(20) NOT NULL, -- active, inactive, suspended, blocked, expired
	"name" varchar(50) NOT NULL,
	description text NULL,
	readonly bool DEFAULT false not null,
  item_order int4 DEFAULT 0 not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--rollback DROP TABLE if exists public.app_user_status;

--changeset lisandro.ortega:app_user.001.1 context:dev,qa,prod
--comment: Create app_user table

CREATE TABLE if not exists public.app_user (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	business_partner_id uuid not NULL,
	role_id uuid not NULL,
	status_id int4 not NULL,
	username varchar(100) NOT NULL,
	password_hash text NOT NULL,
	profile_data jsonb NULL,
	readonly boolean not null default false,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (business_partner_id) REFERENCES public.business_partner(id) ON DELETE CASCADE,
	FOREIGN KEY (role_id) REFERENCES public."role"(id) ON DELETE CASCADE,
	FOREIGN KEY (status_id) REFERENCES public.app_user_status(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public.app_user;

--changeset lisandro.ortega:app_user.001.2 context:dev,qa,prod
--comment: Create unique index for app_user

CREATE UNIQUE INDEX if not exists uq_app_user_partner
ON public.app_user (business_partner_id, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_app_user_partner;

--changeset lisandro.ortega:app_user.001.3 context:dev,qa,prod
--comment: Create unique index for app_user

CREATE UNIQUE INDEX if not exists uq_app_user_username
ON public.app_user (username, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_app_user_username;

--changeset lisandro.ortega:app_user_business_unit.001.1 context:dev,qa,prod
--comment: Create app_user_business_unit table
CREATE TABLE if not exists public.app_user_business_unit (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	app_user_id uuid not NULL,
	business_unit_id uuid not NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	created_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) ON DELETE CASCADE,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
  unique (app_user_id, business_unit_id)
);

--rollback DROP TABLE if exists public.app_user_business_unit;
