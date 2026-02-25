--liquibase Formatted SQL

-- changeset lisandro.ortega:service_provider.001.1 context:dev,qa,prod
--comment: Create service_provider (specialist) table 

CREATE TABLE if not exists public.service_provider (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	business_partner_id uuid NOT NULL,
	active bool DEFAULT true NOT NULL,
  extra_data jsonb NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamptz NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
	FOREIGN KEY (business_partner_id) REFERENCES public.business_partner(id) ON DELETE CASCADE,
	unique (tenant_id, business_partner_id)
);

--rollback DROP TABLE if exists public.service_provider;

--changeset lisandro.ortega:service_provider_service.001.1 context:dev,qa,prod
--comment: Create service_provider_service table: refers what services are offered by a service provider in a specific business unit

create table if not exists public.service_provider_service (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	business_unit_id uuid NOT NULL,
	service_provider_id uuid NOT NULL,
	service_id uuid NOT NULL,
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
	FOREIGN KEY (service_provider_id) REFERENCES public.service_provider(id) ON DELETE CASCADE,
	FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
	UNIQUE (tenant_id, business_unit_id, service_provider_id, service_id)
);

--rollback DROP TABLE if exists public.service_provider_service;

--changeset lisandro.ortega:service_provider_schedule.001.1 context:dev,qa,prod
--comment: Create service_provider_schedule table: defining weekly schedules for service providers, with specific time slots and durations for appointments

create table if not exists public.service_provider_schedule (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	tenant_id uuid NOT NULL,
	business_unit_id uuid NOT NULL,
	service_provider_id uuid NOT NULL,
	day_of_week int4 NOT NULL, -- 0=Sunday, 1=Monday, ..., 6=Saturday
	start_time time NOT NULL,
	end_time time NOT NULL,
	slot_duration_minutes int4 NOT NULL default 60, -- duration of each appointment slot in minutes
	active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tenant_id) REFERENCES public.tenant(id) ON DELETE CASCADE,
	FOREIGN KEY (business_unit_id) REFERENCES public.business_unit(id) ON DELETE CASCADE,
	FOREIGN KEY (service_provider_id) REFERENCES public.service_provider(id) ON DELETE CASCADE,
	unique (tenant_id, business_unit_id, service_provider_id, day_of_week, start_time, end_time)
);

--rollback DROP TABLE if exists public.service_provider_schedule;
