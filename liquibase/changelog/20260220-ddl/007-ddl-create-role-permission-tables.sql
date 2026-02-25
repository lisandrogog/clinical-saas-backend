--liquibase Formatted SQL

--changeset lisandro.ortega:role.001.1 context:dev,qa,prod
--comment: Create role table

CREATE TABLE if not exists public."role" (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
  code varchar(50) not NULL, -- super_admin, tenant_admin, unit_admin, unit_operator
  "name" varchar(100) not NULL,
	description text NULL,
	readonly bool DEFAULT false not NULL,
	item_order int4 DEFAULT 0 not NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id)
);

--rollback DROP TABLE if exists public."role";

--changeset lisandro.ortega:role.001.2 context:dev,qa,prod
--comment: Create unique index for role

CREATE UNIQUE INDEX if not exists uq_role
ON public."role" (code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_role;

--changeset lisandro.ortega:access_scope.001.1 context:dev,qa,prod
--comment: Create access_scope table

CREATE TABLE if not exists public.access_scope (
	id serial4 NOT NULL,
	code varchar(30) NOT NULL,-- own_records, unit_records, tenant_records
  "name" varchar(50) NOT NULL,
  description text NULL,
  item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--rollback DROP TABLE if exists public.access_scope;

--changeset lisandro.ortega:permission_type.001.1 context:dev,qa,prod
--comment: Create permission_type table

CREATE TABLE if not exists public.permission_type (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	code varchar(20) NOT NULL, -- read_only, read_write, full_access, admin_access.
  description text NULL,
  item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--rollback DROP TABLE if exists public.permission_type;

--changeset lisandro.ortega:permission.001.1 context:dev,qa,prod
--comment: Create permission table

CREATE TABLE if not exists public."permission" (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	role_id uuid not NULL,
	app_sub_module_id int4 not NULL,
	access_scope_id int4 not NULL,
	permission_type_id int4 not NULL,
	readonly bool DEFAULT false not NULL,
	item_order int4 DEFAULT 0 not NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES public."role"(id) ON DELETE CASCADE,
	FOREIGN KEY (app_sub_module_id) REFERENCES public.app_sub_module(id) ON DELETE CASCADE,
	FOREIGN KEY (access_scope_id) REFERENCES public.access_scope(id) ON DELETE CASCADE,
	FOREIGN KEY (permission_type_id) REFERENCES public.permission_type(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public."permission";

--changeset lisandro.ortega:permission.001.2 context:dev,qa,prod
--comment: Create unique index for permission

CREATE UNIQUE INDEX if not exists uq_permission
ON public."permission" (role_id, app_sub_module_id, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_permission;
