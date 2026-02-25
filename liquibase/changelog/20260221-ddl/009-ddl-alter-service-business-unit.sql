--liquibase Formatted SQL

--changeset lisandro.ortega:service_business_unit.002.1 context:dev,qa,prod
--comment: Alter service_business_unit table: remove price and cost default values

alter table service_business_unit
alter column price  set default null,
alter column "cost" set default null;

--rollback alter table service_business_unit alter column price  set default 0, alter column "cost" set default 0;

--changeset lisandro.ortega:service_business_unit.002.2 context:dev,qa,prod
--comment: Alter service_business_unit table: remove price and cost not null constraint

alter table service_business_unit
alter column price  DROP NOT null,
alter column "cost" DROP NOT null;

--rollback alter table service_business_unit alter column price  set NOT null, alter column "cost" set NOT null;

--changeset lisandro.ortega:service.002.1 context:dev,qa,prod
--comment: Alter service table: add duration column

alter table service
add column duration integer not null default 0;

--rollback alter table service drop column duration;

--changeset lisandro.ortega:service_business_unit.002.3 context:dev,qa,prod
--comment: Alter service_business_unit table: add duration column

alter table service_business_unit
add column duration integer null;

--rollback alter table service_business_unit drop column duration;

