--liquibase formatted sql

--changeset lisandro.ortega:service_order.003.1 context:dev,qa,prod
--comment: Add document_number column to service_order table

alter table service_order 
add column document_number varchar(50) not null;

--rollback alter table service_order drop column document_number;


--changeset lisandro.ortega:service_order.004.1 context:dev,qa,prod
--comment: Create unique index for service_order

CREATE UNIQUE INDEX if not exists uq_service_order_document_number
ON public.service_order (tenant_id, business_unit_id, document_number, removed_at) 
NULLS NOT DISTINCT;

--rollback DROP INDEX if exists uq_service_order_document_number;
