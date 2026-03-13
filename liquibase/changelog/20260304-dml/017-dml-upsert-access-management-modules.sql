--liquibase formatted sql

--changeset lisandro.ortega:app_module.003.1 context:dev,qa,prod
--comment: Add Access Management module

with insert_payload as (
	select
		(select p.id from platform p where p.code = 'core_healthcare' and p.readonly is true limit 1) as platform_id, 
		'Access Management' as name, 
		'access_management' as code,
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

--rollback delete from app_module where code = 'access_management';

--changeset lisandro.ortega:app_module.004.1 context:dev,qa,prod
--comment: Update item order for app_modules

update app_module
set item_order = item_order + 1
where code in(
	'platform_customer',
	'service_catalog',
	'service_provider',
	'service_order'
);

--rollback update app_module set item_order = item_order - 1 where code in('platform_customer','service_catalog','service_provider','service_order');

--changeset lisandro.ortega:app_sub_module.003.2 context:dev,qa,prod
--comment: Update app_sub_module for Access Management

update app_sub_module asm 
set app_module_id = (
	select am.id from app_module am 
	where am.code = 'access_management'
	and am.readonly is true
	limit 1
)
where asm.code in('roles','app_user');

--rollback 

