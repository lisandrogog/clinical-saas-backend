--liquibase Formatted SQL

--changeset lisandro.ortega:access_scope.002.1 context:dev,qa,prod
--comment: Insert default access scopes

INSERT INTO public.access_scope(code, "name", item_order, readonly)
VALUES
  ('own_records', 'Own Records', 1, true),
  ('unit_records', 'Unit Records', 2, true),
  ('tenant_records', 'Tenant Records', 3, true),
  ('all_records', 'All Records', 4, true)
ON CONFLICT (code) DO NOTHING;

--rollback DELETE FROM public.access_scope WHERE code IN ('own_records', 'unit_records', 'tenant_records', 'all_records');

--changeset lisandro.ortega:permission_type.002.1 context:dev,qa,prod
--comment: Insert default permission types

INSERT INTO public.permission_type
("name", code, item_order, readonly)
VALUES
  ('Read Only', 'read_only', 1, true),
  ('Read Write', 'read_write', 2, true),
  ('Read Update', 'read_update', 3, true),
  ('Full Access', 'full_access', 4, true)
ON CONFLICT (code) DO NOTHING;

--rollback DELETE FROM public.permission_type WHERE code IN ('read_only', 'read_write', 'read_update', 'full_access');

--changeset lisandro.ortega:role.002.1 context:dev,qa,prod
--comment: Insert default roles

INSERT INTO public."role"(id, code, "name", readonly, item_order)
VALUES
  ('019c6e4a-2710-7e10-aa50-602286e8af6b'::uuid, 'super_admin', 'Super Admin', true, 1),
  ('019c6e4a-2713-720c-830d-8f49c164176a'::uuid, 'tenant_admin', 'Tenant Admin', true, 2),
  ('019c6e4a-2715-7876-82ab-cc0f7553cb45'::uuid, 'unit_admin', 'Unit Admin', true, 3),
  ('019c6e4a-2717-743d-9493-4a269eca77ac'::uuid, 'unit_operator', 'Unit Operator', true, 4),
  ('019c8831-a2e6-7729-91a8-9a6d0bb76145'::uuid, 'unit_assistant', 'Unit Assistant', true, 5)
ON CONFLICT (id) DO NOTHING;

--rollback DELETE FROM public."role" WHERE code IN ('super_admin', 'tenant_admin', 'unit_admin', 'unit_operator');

--changeset lisandro.ortega:permission.002.1 context:dev,qa,prod
--comment: Insert default permissions for role super_admin

with permission_data as (
select 
	asm.code as app_sub_module_code, asm.id as app_sub_module_id,
	am.code as app_module_code, am.id as app_module_id,
	r.code as role_code, r.id as role_id ,
	t.code as access_scope_code, t.id as access_scope_id,
	pt.code as permission_type_code, pt.id as permission_type_id
from (
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
) as sub_data(name, code, item_order, module_code)
inner join app_sub_module asm on asm.code = sub_data.code
inner join app_module am on am.id = asm.app_module_id and am.code = sub_data.module_code 
cross join "role" r
cross join access_scope t 
cross join permission_type pt
where r.code = 'super_admin'
and t.code = 'all_records'
and pt.code = 'full_access'
)
insert into "permission" (role_id, app_sub_module_id, access_scope_id, permission_type_id, readonly)
select 
	pd.role_id, 
	pd.app_sub_module_id, 
	pd.access_scope_id, 
	pd.permission_type_id, 
	true 
from permission_data pd
where not exists (
select 1 
from permission p 
where 
	pd.role_id = p.role_id and  
	pd.app_sub_module_id = p.app_sub_module_id and  
	pd.access_scope_id = p.access_scope_id and 
	pd.permission_type_id = p.permission_type_id 
);

--rollback DELETE FROM public."permission" WHERE role_id IN ('super_admin');

--changeset lisandro.ortega:permission.003.1 context:dev,qa,prod
--comment: Insert default permissions for role tenant_admin

with permission_data as (
select 
	asm.code as app_sub_module_code, asm.id as app_sub_module_id,
	am.code as app_module_code, am.id as app_module_id,
	r.code as role_code, r.id as role_id ,
	t.code as access_scope_code, t.id as access_scope_id,
	pt.code as permission_type_code, pt.id as permission_type_id
from (
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
) as sub_data(name, code, item_order, module_code)
inner join app_sub_module asm on asm.code = sub_data.code
inner join app_module am on am.id = asm.app_module_id and am.code = sub_data.module_code 
cross join "role" r
cross join access_scope t 
cross join permission_type pt
where r.code = 'tenant_admin'
and t.code = 'tenant_records'
and pt.code = 'full_access'
)
insert into "permission" (role_id, app_sub_module_id, access_scope_id, permission_type_id, readonly)
select 
	pd.role_id, 
	pd.app_sub_module_id, 
	pd.access_scope_id, 
	pd.permission_type_id, 
	true 
from permission_data pd
where not exists (
select 1 
from permission p 
where 
	pd.role_id = p.role_id and  
	pd.app_sub_module_id = p.app_sub_module_id and  
	pd.access_scope_id = p.access_scope_id and 
	pd.permission_type_id = p.permission_type_id 
);

--rollback DELETE FROM public."permission" WHERE role_id IN ('tenant_admin');

--changeset lisandro.ortega:permission.004.1 context:dev,qa,prod
--comment: Insert default permissions for role unit_admin

with permission_data as (
select 
	asm.code as app_sub_module_code, asm.id as app_sub_module_id,
	am.code as app_module_code, am.id as app_module_id,
	r.code as role_code, r.id as role_id ,
	t.code as access_scope_code, t.id as access_scope_id,
	pt.code as permission_type_code, pt.id as permission_type_id
from (
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
) as sub_data(name, code, item_order, module_code)
inner join app_sub_module asm on asm.code = sub_data.code
inner join app_module am on am.id = asm.app_module_id and am.code = sub_data.module_code 
cross join "role" r
cross join access_scope t 
cross join permission_type pt
where r.code = 'unit_admin'
and t.code = 'unit_records'
and pt.code = 'full_access'
)
insert into "permission" (role_id, app_sub_module_id, access_scope_id, permission_type_id, readonly)
select 
	pd.role_id, 
	pd.app_sub_module_id, 
	pd.access_scope_id, 
	pd.permission_type_id, 
	true 
from permission_data pd
where not exists (
select 1 
from permission p 
where 
	pd.role_id = p.role_id and  
	pd.app_sub_module_id = p.app_sub_module_id and  
	pd.access_scope_id = p.access_scope_id and 
	pd.permission_type_id = p.permission_type_id 
);

--rollback DELETE FROM public."permission" WHERE role_id IN ('unit_admin');

--changeset lisandro.ortega:permission.005.1 context:dev,qa,prod
--comment: Insert default permissions for role unit_operator

with permission_data as (
select 
	asm.code as app_sub_module_code, asm.id as app_sub_module_id,
	am.code as app_module_code, am.id as app_module_id,
	r.code as role_code, r.id as role_id ,
	t.code as access_scope_code, t.id as access_scope_id,
	pt.code as permission_type_code, pt.id as permission_type_id
from (
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
) as sub_data(name, code, item_order, module_code)
inner join app_sub_module asm on asm.code = sub_data.code
inner join app_module am on am.id = asm.app_module_id and am.code = sub_data.module_code 
cross join "role" r
cross join access_scope t 
cross join permission_type pt
where r.code = 'unit_operator'
and t.code = 'unit_records'
and pt.code = 'read_update'
)
insert into "permission" (role_id, app_sub_module_id, access_scope_id, permission_type_id, readonly)
select 
	pd.role_id, 
	pd.app_sub_module_id, 
	pd.access_scope_id, 
	pd.permission_type_id, 
	true 
from permission_data pd
where not exists (
select 1 
from permission p 
where 
	pd.role_id = p.role_id and  
	pd.app_sub_module_id = p.app_sub_module_id and  
	pd.access_scope_id = p.access_scope_id and 
	pd.permission_type_id = p.permission_type_id 
);

--rollback DELETE FROM public."permission" WHERE role_id IN ('unit_operator');

--changeset lisandro.ortega:permission.006.1 context:dev,qa,prod
--comment: Insert default permissions for role unit_assistant

with permission_data as (
select 
	asm.code as app_sub_module_code, asm.id as app_sub_module_id,
	am.code as app_module_code, am.id as app_module_id,
	r.code as role_code, r.id as role_id ,
	t.code as access_scope_code, t.id as access_scope_id,
	pt.code as permission_type_code, pt.id as permission_type_id
from (
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
) as sub_data(name, code, item_order, module_code)
inner join app_sub_module asm on asm.code = sub_data.code
inner join app_module am on am.id = asm.app_module_id and am.code = sub_data.module_code 
cross join "role" r
cross join access_scope t 
cross join permission_type pt
where r.code = 'unit_assistant'
and t.code = 'unit_records'
and pt.code = 'read_write'
)
insert into "permission" (role_id, app_sub_module_id, access_scope_id, permission_type_id, readonly)
select 
	pd.role_id, 
	pd.app_sub_module_id, 
	pd.access_scope_id, 
	pd.permission_type_id, 
	true 
from permission_data pd
where not exists (
select 1 
from permission p 
where 
	pd.role_id = p.role_id and  
	pd.app_sub_module_id = p.app_sub_module_id and  
	pd.access_scope_id = p.access_scope_id and 
	pd.permission_type_id = p.permission_type_id 
);

--rollback DELETE FROM public."permission" WHERE role_id IN ('unit_assistant');
