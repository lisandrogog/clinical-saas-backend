----liquibase Formatted SQL

--changeset lisandro.ortega:service_order.001.1 context:dev,qa,prod
--comment: Create service_order table (Appointment)

CREATE TABLE if not exists public.service_order (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  tenant_id uuid not NULL,
  business_unit_id uuid not NULL,
  customer_id uuid not NULL, -- patient
  agent_id uuid not NULL, -- specialist
  document_status_id int4 not NULL,
  document_type_id int4 not null,
  total_amount numeric(15, 2) DEFAULT 0 not NULL,
  scheduled_at timestamptz NULL,
  extra_data jsonb NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
  created_by uuid NULL,
  updated_at timestamptz NULL,
  updated_by uuid NULL,
  removed_at timestamptz NULL,
  removed_by uuid NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
  FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES public.business_partner(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES public.business_partner(id) ON DELETE CASCADE,
  FOREIGN KEY (document_status_id) REFERENCES public.document_status(id) ON DELETE cascade,
  foreign key (document_type_id) references document_type(id) on delete cascade
);

--rollback DROP TABLE if exists public.service_order;

--changeset lisandro.ortega:service_order_item.001.1 context:dev,qa,prod
--comment: Create service_order_item table (Requested Services)

CREATE TABLE if not exists public.service_order_item (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  service_order_id uuid not NULL,
  service_id uuid not NULL,
  quantity numeric(15, 3) NOT NULL,
  unit_price numeric(15, 2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (service_order_id) REFERENCES public.service_order(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
  UNIQUE (service_order_id, service_id)
);

--rollback DROP TABLE if exists public.service_order_item;

--changeset lisandro.ortega:service_order_details.001.1 context:dev,qa,prod
--comment: Create service_order_details table (Medical Entry): linked to service order, with symptoms, diagnosis, treatment plan, prescription and extra data in jsonb format for flexibility

create table if not exists public.service_order_details (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	service_order_id uuid not NULL,
	symptoms text NULL,
	diagnosis text NULL,
	treatment_plan text NULL,
	prescription jsonb NULL,
	extra_data jsonb NULL,
	start_at timestamptz NULL,
	end_at timestamptz NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP not NULL,
	created_by uuid NULL,
	updated_at timestamptz NULL,
	updated_by uuid NULL,
	removed_at timestamptz NULL,
	removed_by uuid NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (service_order_id) REFERENCES public.service_order(id) ON DELETE CASCADE
);

--rollback DROP TABLE if exists public.service_order_details;

--changeset lisandro.ortega:service_order_details.001.2 context:dev,qa,prod
--comment: Create unique index for service_order_details

CREATE UNIQUE INDEX if not exists uq_service_order_details
ON public.service_order_details (service_order_id, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_service_order_details;
