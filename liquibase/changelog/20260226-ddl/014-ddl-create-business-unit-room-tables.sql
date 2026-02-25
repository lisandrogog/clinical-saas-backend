--liquibase Formatted SQL

--changeset lisandro.ortega:business_unit_room.001.1 context:dev,qa,prod
--comment: Create business_unit_room table

create table if not exists business_unit_room (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid not null,
	business_unit_id uuid not null, 
	code varchar(20) NOT NULL,
	"name" varchar(50) NOT NULL,
	description text NULL,
	item_order int4 DEFAULT 0 not null,
	active bool DEFAULT true NOT NULL,
	capacity int4 default 1 not null,
	extra_data jsonb NULL,
	readonly boolean not null default false,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid null,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE	
);

CREATE UNIQUE INDEX uq_business_unit_room
ON public.business_unit_room (tenant_id, business_unit_id, code, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_business_unit_room;
--rollback DROP TABLE if exists public.business_unit_room;

--changeset lisandro.ortega:business_unit_room_service.001.1 context:dev,qa,prod
--comment: Create business_unit_room_service table

create table if not exists business_unit_room_service (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	business_unit_room_id uuid NOT NULL,
	service_id uuid NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	updated_at timestamptz default null,
	PRIMARY KEY (id),
	FOREIGN KEY (business_unit_room_id) REFERENCES public.business_unit_room(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
	UNIQUE (business_unit_room_id, service_id)
);

--rollback DROP TABLE if exists public.business_unit_room_service;

--changeset lisandro.ortega:service_order.001.1 context:dev,qa,prod
--comment: Add business_unit_room_id column to service_order table

alter table service_order 
add column business_unit_room_id uuid default null,
add FOREIGN KEY (business_unit_room_id) REFERENCES public.business_unit_room(id) ON DELETE cascade;

--rollback ALTER TABLE service_order DROP COLUMN business_unit_room_id;
