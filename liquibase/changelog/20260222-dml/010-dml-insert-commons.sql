--liquibase Formatted SQL

--changeset lisandro.ortega:identification_type.002.1 context:dev,qa,prod
--comment: Insert default identification types

INSERT INTO public.identification_type (code, "name", readonly, item_order)
VALUES
    ('cedula', 'Cédula', true, 0),
    ('rif', 'Rif', true, 1),
    ('tax_id', 'Tax ID', true, 2),
    ('passport', 'Passport', true, 3),
    ('driver_license', 'Driver License', true, 4),
    ('personal_id', 'Personal ID', true, 5),
    ('reference', 'Reference', true, 6),
    ('rut', 'RUT', true, 7),
    ('nit', 'NIT', true, 8)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.identification_type where code in ('cedula', 'personal_id', 'tax_id', 'passport', 'driver_license', 'rut', 'nit', 'rif', 'reference');

--changeset lisandro.ortega:app_user_status.002.1 context:dev,qa,prod
--comment: Insert default app user statuses

INSERT INTO public.app_user_status (code, "name", description, item_order, readonly)
VALUES
  ('pending', 'Pending', NULL, 1, false),
  ('active', 'Active', NULL, 2, false),
  ('inactive', 'Inactive', NULL, 3, false),
  ('suspended', 'Suspended', NULL, 4, false),
  ('blocked', 'Blocked', NULL, 5, false),
  ('expired', 'Expired', NULL, 6, false)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.app_user_status where code in ('pending', 'active', 'inactive', 'suspended', 'blocked', 'expired');

--changeset lisandro.ortega:document_action.002.1 context:dev,qa,prod
--comment: Insert default document actions

INSERT INTO public.document_action (code, "name", readonly, item_order)
VALUES
    ('confirm', 'Confirm', true, 0),
    ('schedule', 'Schedule', true, 1),
    ('re_schedule', 'Re Schedule', true, 2),
    ('start', 'Start', true, 3),
    ('cancel', 'Cancel', true, 4),
    ('complete', 'Complete', true, 5),
    ('close', 'Close', true, 6),
    ('void', 'Void', true, 7)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.document_action where code in ('confirm', 'schedule', 're_schedule', 'start', 'cancel', 'complete', 'close', 'void');

--changeset lisandro.ortega:document_status.002.1 context:dev,qa,prod
--comment: Insert default document statuses

INSERT INTO public.document_status(code, "name", is_editable, is_final, is_posted, allow_backwards, readonly, item_order)
VALUES
    ('draft', 'Draft', true, false, false, false, true, 0),
    ('pending', 'Pending', true, false, false, false, true, 1),
    ('scheduled', 'Scheduled', false, false, false, true, true, 2),
    ('in_progress', 'In Progress', false, false, false, true, true, 3),
    ('canceled', 'Canceled', false, true, false, false, true, 4),
    ('completed', 'Completed', false, false, true, false, true, 5),
    ('closed', 'Closed', false, true, false, false, true, 6),
    ('voided', 'Voided', false, true, false, false, true, 7)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.document_status where code in ('draft', 'pending', 'scheduled', 'in_progress', 'canceled', 'completed', 'closed', 'voided');

--changeset lisandro.ortega:document_type.002.1 context:dev,qa,prod
--comment: Insert default document types

INSERT INTO public.document_type(code, "name", readonly)
VALUES
    ('service_order', 'Service Order', true)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.document_type where code in ('service_order');


--changeset lisandro.ortega:document_engine.002.1 context:dev,qa,prod
--comment: Insert default document engine

INSERT INTO public.document_engine
(id, code, "name", description, document_type_id, initial_state_id, is_default, readonly)
select 
	'019c840d-0443-790a-969c-14e89301b753'::uuid, 
	'service_order', 
	'Service Order Document Engine', 
	NULL, 
	(select dt.id from document_type dt where dt.code='service_order' and dt.readonly is true limit 1), 
	(select ds.id from document_status ds where ds.code='draft' and ds.readonly is true limit 1), 
	true, 
	true
where not exists (select 1 from document_engine de where de.document_type_id = 
	(select dt.id from document_type dt where dt.code='service_order' and dt.readonly is true limit 1)
	and de.readonly is true
);

--rollback delete from public.document_engine where code in ('service_order');

--changeset lisandro.ortega:document_engine_item.002.2 context:dev,qa,prod
--comment: Insert default document engine items

INSERT INTO document_engine_item (id, document_engine_id, document_action_id, from_state_id, to_state_id, readonly)
WITH raw_data (id, engine_id, action_code, from_code, to_code) AS (
    VALUES 
        ('7677096c-c0f6-4a98-a298-8c76beb52dcb', '019c840d-0443-790a-969c-14e89301b753', 'confirm', 'draft', 'pending'),
        ('d8dd1051-dc71-4a47-987e-ba606e051d0f', '019c840d-0443-790a-969c-14e89301b753', 'schedule', 'draft', 'scheduled'),
        ('26972422-55e8-41a1-96f3-12ae78b27814', '019c840d-0443-790a-969c-14e89301b753', 'cancel', 'draft', 'canceled'),
        ('4d23e874-e6aa-4f5d-a09d-c60c818b694e', '019c840d-0443-790a-969c-14e89301b753', 'schedule', 'pending', 'scheduled'),
        ('65ee2f46-4891-44a3-b349-b9e33c9f38ce', '019c840d-0443-790a-969c-14e89301b753', 'start', 'pending', 'in_progress'),
        ('d4c8b254-202f-4d6b-bd7d-0acf0a2d74e7', '019c840d-0443-790a-969c-14e89301b753', 'cancel', 'pending', 'canceled'),
        ('77686139-84b2-45c6-a187-4bad76faeaf4', '019c840d-0443-790a-969c-14e89301b753', 're_schedule', 'scheduled', 'scheduled'),
        ('e8e85604-7b1c-467d-a8e6-ffd9c217a89b', '019c840d-0443-790a-969c-14e89301b753', 'start', 'scheduled', 'in_progress'),
        ('03c59a0e-33fc-41de-af5a-771b2e804855', '019c840d-0443-790a-969c-14e89301b753', 'cancel', 'scheduled', 'canceled'),
        ('ddae304d-e578-4174-a01b-cb6dcd8884c3', '019c840d-0443-790a-969c-14e89301b753', 'complete', 'in_progress', 'completed'),
        ('139c4b53-9738-424d-815f-593dae5da5e6', '019c840d-0443-790a-969c-14e89301b753', 'close', 'completed', 'closed')
)
SELECT 
    rd.id::uuid, 
    rd.engine_id::uuid, 
    da.id, 
    ds_from.id, 
    ds_to.id, 
    true
FROM raw_data rd
JOIN document_action da ON da.code = rd.action_code AND da.readonly IS TRUE
JOIN document_status ds_from ON ds_from.code = rd.from_code AND ds_from.readonly IS TRUE
JOIN document_status ds_to ON ds_to.code = rd.to_code AND ds_to.readonly IS TRUE
ON CONFLICT (id) DO NOTHING;

--rollback delete from public.document_engine_item where document_engine_id = '019c840d-0443-790a-969c-14e89301b753'::uuid;

--changeset lisandro.ortega:platform.002.1 context:dev,qa,prod
--comment: Insert default platform

INSERT INTO public.platform
("name", code, readonly)
VALUES('Healthcare Platform', 'core_healthcare', true)
ON CONFLICT (code) DO NOTHING;

--rollback delete from public.platform where code in ('core_healthcare');

--changeset lisandro.ortega:app_module.002.1 context:dev,qa,prod
--comment: Insert default app modules

WITH target_platform AS (
    SELECT id 
    FROM platform 
    WHERE code = 'core_healthcare' 
      AND readonly IS TRUE 
    LIMIT 1
)
INSERT INTO public.app_module (platform_id, "name", code, item_order, readonly)
SELECT 
    tp.id, 
    data.name, 
    data.code, 
    data.item_order, 
    true
FROM target_platform tp
CROSS JOIN (
    VALUES 
        ('Organization',       'organization',      1),
        ('Platform Customers', 'platform_customer', 2),
        ('Service Catalog',    'service_catalog',   3),
        ('Providers',          'service_provider',  4),
        ('Service Orders',     'service_order',     5)
) AS data(name, code, item_order)
ON CONFLICT (platform_id, code) DO NOTHING;

--rollback delete from public.app_module where platform_id = (select id from platform where code = 'core_healthcare' and readonly is true limit 1) and readonly is true;

--changeset lisandro.ortega:app_sub_module.002.1 context:dev,qa,prod
--comment: Insert default app sub modules

with app_modules as (
	select am.id, am.platform_id, am.code 
	from app_module am 
	where am.readonly is true
	order by am.item_order 
)
insert into app_sub_module(app_module_id, "name" , code, item_order, readonly)
select 
	am.id as app_module_id, sub_data."name" , sub_data.code, sub_data.item_order , true as readonly
from app_modules am 
inner join (
	values 
		('Identification Types','identification_type', 1, 'organization'),
		('Tenants','tenant', 2, 'organization'),
		('Business Units','business_unit', 3, 'organization'),
		('Roles', 'roles', 4, 'organization'),
		('Application Users', 'app_user', 5, 'organization'),
		('Customers','customer', 1, 'platform_customer'),
		('Service Categories','service_category', 1, 'service_catalog'),
		('Services','service', 2, 'service_catalog'),
		('Services By Business Units','service_business_unit', 3, 'service_catalog'),
		('Service Providers','service_provider', 1, 'service_provider'),
		('Service Provider Services','service_provider_service', 2, 'service_provider'),
		('Service Provider Schedule','service_provider_shedule', 3, 'service_provider'),
		('Service Orders','service_order', 1, 'service_order'),
		('Service Order Details','service_order_detail', 2, 'service_order')
) as sub_data(name, code, item_order, module_code) on am.code = sub_data.module_code
on conflict (app_module_id, code) do nothing;

--rollback delete from public.app_sub_module where app_module_id in (select id from app_module where platform_id = (select id from platform where code = 'core_healthcare' and readonly is true limit 1) and readonly is true) and readonly is true;
