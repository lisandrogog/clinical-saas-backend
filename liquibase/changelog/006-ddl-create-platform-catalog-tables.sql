--liquibase Formatted SQL

--changeset lisandro.ortega:platform.001.1 context:dev,qa,prod
--comment: Create platform table

CREATE TABLE if not exists public.platform (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	code varchar(50) NULL,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--rollback DROP TABLE if exists public.platform;

--changeset lisandro.ortega:app_module.001.1 context:dev,qa,prod
--comment: Create app_module table: defining application modules that can be linked to platforms (e.g. inventory, sales, reporting, etc.)

CREATE TABLE if not exists public.app_module (
	id serial4 NOT NULL,
	platform_id int4 NULL,
	"name" varchar(100) NULL,
	code varchar(50) NULL,
	item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
	FOREIGN KEY (platform_id) REFERENCES public.platform(id) ON DELETE CASCADE,
  unique (platform_id, code)
);

--rollback Drop table if exists public.app_module;

--changeset lisandro.ortega:app_sub_module.001.1 context:dev,qa,prod
--comment: Create app_sub_module table: defining sub-modules linked to app modules (e.g. under inventory module: stock management, purchase orders, etc.)

CREATE TABLE if not exists public.app_sub_module (
	id serial4 NOT NULL,
	app_module_id int4 NULL,
	"name" varchar(100) NULL,
	code varchar(50) NULL,
	item_order int4 DEFAULT 0 not null,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
	FOREIGN KEY (app_module_id) REFERENCES public.app_module(id) ON DELETE CASCADE,
  unique (app_module_id, code)
);

--rollback Drop table if exists public.app_sub_module;
