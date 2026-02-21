--liquibase Formatted SQL

--changeset lisandro.ortega:service_category.001.1 context:dev,qa,prod
--comment: Create service_category table

CREATE TABLE if not exists public.service_category (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	code varchar(50) NOT NULL,
  "name" varchar(100) NOT NULL,
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE cascade
);

--rollback DROP TABLE if exists public.service_category;

--changeset lisandro.ortega:service_category.001.2 context:dev,qa,prod
--comment: Create unique index for service_category

CREATE UNIQUE INDEX if not exists uq_service_category
ON public.service_category (tenant_id, code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_service_category;

--changeset lisandro.ortega:service.001.1 context:dev,qa,prod
--comment: Create service table

CREATE TABLE if not exists public.service (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	service_category_id uuid NOT NULL,
	code varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL,
	base_price numeric(15, 2) not null default 0,
	base_cost numeric(15, 2) not null default 0,
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (service_category_id) REFERENCES public.service_category(id) ON DELETE CASCADE,
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public.service;

--changeset lisandro.ortega:service.001.2 context:dev,qa,prod
--comment: Create unique index for service

CREATE UNIQUE INDEX if not exists uq_service
ON public.service (tenant_id, code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_service;

--changeset lisandro.ortega:service_business_unit.001.1 context:dev,qa,prod
--comment: Create service_business_unit table

CREATE TABLE if not exists public.service_business_unit (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	service_id uuid NOT NULL,
	business_unit_id uuid NOT NULL,
	price numeric(15, 2) not null default 0,
	"cost" numeric(15, 2) not null default 0,
	active bool DEFAULT true NOT NULL,
  extra_data jsonb NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid null,
	updated_at timestamptz null,
	updated_by uuid null,
	PRIMARY KEY (id),
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
  UNIQUE (service_id, business_unit_id)
);

--rollback DROP TABLE if exists public.service_business_unit;
