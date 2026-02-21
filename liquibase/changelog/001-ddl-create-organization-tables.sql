--liquibase Formatted SQL

--changeset lisandro.ortega:extension.001.1 context:dev,qa,prod
--comment: Create extension uuid-ossp to enable uuid generation

CREATE EXTENSION if not exists "uuid-ossp";

--rollback DROP EXTENSION if exists "uuid-ossp";

--changeset lisandro.ortega:identification_type.001.1 context:dev,qa,prod
--comment: Create identification_type table

CREATE TABLE if not exists public.identification_type (
	id serial4 NOT NULL,
	code varchar(20) NOT NULL, -- passport, driver_license, tax_id, cedula
  "name" varchar(250) NOT NULL,
	readonly bool DEFAULT false not null,
	item_order int4 DEFAULT 0 not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--rollback DROP TABLE if exists public.identification_type;

--changeset lisandro.ortega:tenant.001.1 context:dev,qa,prod
--comment: Create tenant table

CREATE TABLE if not exists public.tenant (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
  identification_type_id int4 NOT NULL,
	identification_number varchar(255) NOT NULL,
	code varchar(50) NOT NULL,
  business_name varchar(255) NOT NULL,
	email varchar(255) NULL,
	phone varchar(50) NULL,
	active bool DEFAULT true NOT NULL,
	readonly bool DEFAULT false not null,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
  PRIMARY KEY (id),
	FOREIGN KEY (identification_type_id) REFERENCES public.identification_type(id) ON DELETE CASCADE,
  UNIQUE (code),
	UNIQUE (identification_number, identification_type_id)
);

--rollback DROP TABLE if exists public.tenant;

--changeset lisandro.ortega:business_unit.001.1 context:dev,qa,prod
--comment: Create business_unit table

CREATE TABLE if not exists public.business_unit (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	code varchar(50) NOT NULL,
  business_name varchar(255) NOT NULL,
	email varchar(255) NULL,
	phone varchar(50) NULL,
	address text NULL,
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public.business_unit;

--changeset lisandro.ortega:business_unit.001.2 context:dev,qa,prod
--comment: Create unique index for business_unit

CREATE UNIQUE INDEX if not exists uq_business_unit
ON public.business_unit (tenant_id, code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_business_unit;

--changeset lisandro.ortega:business_partner.001.1 context:dev,qa,prod
--comment: Create business_partner table

CREATE TABLE if not exists public.business_partner (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
  identification_type_id int4 NOT NULL,
  identification_number varchar(255) NOT NULL,
  first_name varchar(100) NULL,
	last_name varchar(100) NULL,
	email varchar(255) NULL,
	phone varchar(50) NULL,
	birth_date date null,
	short_address text null,
	address text NULL,
	is_customer bool DEFAULT false NOT NULL,
	is_agent bool DEFAULT false NOT NULL,
	is_supplier bool DEFAULT false NOT NULL,
	active bool DEFAULT true NOT NULL,
	extra_data jsonb NULL,
	readonly bool DEFAULT false not null,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (identification_type_id) REFERENCES public.identification_type(id) ON DELETE CASCADE,
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public.business_partner;

--changeset lisandro.ortega:business_partner.001.2 context:dev,qa,prod
--comment: Create unique index for business_partner

CREATE UNIQUE INDEX if not exists uq_business_partner
ON public.business_partner (tenant_id, identification_number, identification_type_id, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_business_partner;

--changeset lisandro.ortega:business_partner_business_unit.001.1 context:dev,qa,prod
--comment: Create business_partner_business_unit table

create table if not exists business_partner_business_unit(
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	business_partner_id uuid NOT NULL,
	business_unit_id uuid NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (business_partner_id) REFERENCES public.business_partner(id) ON DELETE CASCADE,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
	UNIQUE (business_partner_id, business_unit_id)
);

--rollback DROP TABLE if exists business_partner_business_unit;
