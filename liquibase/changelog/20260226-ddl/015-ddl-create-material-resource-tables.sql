--liquibase Formatted SQL

--changeset lisandro.ortega:material_resource_type.001.1 context:dev,qa,prod
--comment: Create material_resource_type table

CREATE TABLE if not exists public.material_resource_type (
	id serial4 NOT NULL,
	code varchar(20) NOT NULL, -- materiales, instrumentos, uniformes
	"name" varchar(50) NOT NULL,
	description text NULL,
	item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	is_consumable bool default false not null,
	UNIQUE (code),
	PRIMARY KEY (id)
);

--rollback DROP TABLE if exists public.material_resource_type;

--changeset lisandro.ortega:material_resource.001.1 context:dev,qa,prod
--comment: Create material_resource table

CREATE TABLE if not exists public.material_resource (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid not null,
	material_resource_type_id int4 not null,
	code varchar(20) NOT NULL, 
	"name" varchar(50) NOT NULL,
	description text NULL,
	item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid null,
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
	FOREIGN KEY (material_resource_type_id) REFERENCES public.material_resource_type(id) ON DELETE CASCADE,
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX uq_material_resource
ON public.material_resource (tenant_id, material_resource_type_id, code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_material_resource;
--rollback DROP TABLE if exists public.material_resource;

--changeset lisandro.ortega:business_unit_material_resource.001.1 context:dev,qa,prod
--comment: Create business_unit_material_resource table

create table if not exists public.business_unit_material_resource(
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	business_unit_id uuid not null, 
	material_resource_id uuid not null,
	quantity numeric(15, 2) not null default 0,
	quantity_available numeric(15, 2) not null default 0,
	quantity_reserved numeric(15, 2) not null default 0,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid null,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
	FOREIGN KEY (material_resource_id) REFERENCES public.material_resource(id) ON DELETE CASCADE,
	unique(business_unit_id, material_resource_id),
	PRIMARY KEY (id)
);

--rollback DROP TABLE if exists public.business_unit_material_resource;

--changeset lisandro.ortega:service_material_resource.001.1 context:dev,qa,prod
--comment: Create service_material_resource table

create table if not exists service_material_resource(
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	service_id uuid not null, 
	material_resource_id uuid not null,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamptz NULL,
	FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
	FOREIGN KEY (material_resource_id) REFERENCES public.material_resource(id) ON DELETE CASCADE,
	unique(service_id, material_resource_id),
	PRIMARY KEY (id)
);

--rollback DROP TABLE if exists public.service_material_resource;
