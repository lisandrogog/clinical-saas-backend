--liquibase formatted sql

--changeset lisandro.ortega:app_module.004.1 context:dev,qa,prod
--comment: Add Resource Management module

with insert_payload as (
	select
		(select p.id from platform p where p.code = 'core_healthcare' and p.readonly is true limit 1) as platform_id, 
		'Resource Management' as name, 
		'resource_management' as code,
		2 as item_order, 
		true as readonly
)
INSERT INTO public.app_module
(platform_id, "name", code, item_order, readonly)
select ip.platform_id, ip."name", ip.code, ip.item_order, ip.readonly
from insert_payload ip
where not exists(
	select 1 from app_module am 
	where am.platform_id = ip.platform_id 
	and am.code = ip.code 
	and am.readonly = ip.readonly
	limit 1
);

--rollback delete from app_module where code = 'resource_management';

--changeset lisandro.ortega:app_sub_module.003.1 context:dev,qa,prod
--comment: Add Resource Management sub-modules

WITH 
resource_module AS (
    SELECT id 
    FROM app_module 
    WHERE code = 'resource_management' 
    AND readonly IS TRUE 
    LIMIT 1
),
resource_sub_modules (name, code, item_order) AS (
    VALUES
        ('Material Resource Type', 'material_resource_type', 1),
        ('Material Resource', 'material_resource', 2),
        ('Business Unit Room', 'business_unit_room', 3)
)
INSERT INTO public.app_sub_module
(app_module_id, "name", code, item_order, readonly)
SELECT 
    rm.id AS module_id,
    rsm.name,
    rsm.code,
    rsm.item_order,
    true
FROM resource_module rm
CROSS JOIN resource_sub_modules rsm
where not exists (
	select 1 from app_sub_module asm 
	where asm.app_module_id  = rm.id
	and asm.code = rsm.code
	limit 1
);

--rollback delete from app_sub_module where code in('material_resource_type','material_resource','business_unit_room');

--changeset lisandro.ortega:app_module.005.1 context:dev,qa,prod
--comment: Update item order for app_modules

update app_module
set item_order = item_order + 1
where code in(
	'access_management',
	'platform_customer',
	'service_catalog',
	'service_provider',
	'service_order'
);

--rollback update app_module set item_order = item_order - 1 where code in('access_management','platform_customer','service_catalog','service_provider','service_order');
