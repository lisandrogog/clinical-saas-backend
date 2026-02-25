--liquibase Formatted SQL

--changeset lisandro.ortega:business_unit_room_material.001.1 context:dev,qa,prod
--comment: Create business_unit_room_material table

create table if not exists business_unit_room_material(
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	business_unit_room_id uuid not null, 
	material_resource_id uuid not null,
	quantity numeric(15, 2) not null default 0,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid null,
	FOREIGN KEY (business_unit_room_id) REFERENCES public.business_unit_room(id) ON DELETE CASCADE,
	FOREIGN KEY (material_resource_id) REFERENCES public.material_resource(id) ON DELETE CASCADE,
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX uq_business_unit_room_material
ON public.business_unit_room_material (business_unit_room_id, material_resource_id, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_business_unit_room_material;
--rollback DROP TABLE if exists public.business_unit_room_material;

--changeset lisandro.ortega:service_order_resource_consumption.001.1 context:dev,qa,prod
--comment: Create service_order_resource_consumption table

CREATE TABLE IF NOT EXISTS service_order_resource_consumption (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_order_id uuid NOT NULL,
    material_resource_id uuid NOT NULL,
    quantity_used numeric(15, 2) default 1 NOT NULL,
    FOREIGN KEY (service_order_id) REFERENCES public.service_order(id),
    FOREIGN KEY (material_resource_id) REFERENCES public.material_resource(id),
    unique(service_order_id, material_resource_id)
);

--rollback DROP TABLE if exists public.service_order_resource_consumption;
