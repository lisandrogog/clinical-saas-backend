--liquibase Formatted SQL


--changeset lisandro.ortega:tenant.002.1 context:dev,qa,prod
--comment: Insert default tenant

INSERT INTO public.tenant
(id, identification_type_id, identification_number, code, business_name, email, readonly)
VALUES(
    '2cbbf66c-3230-4cbb-a4c5-dea0cb042652'::uuid, 
    (select id from identification_type where code = 'tax_id'), 
    '0000000000', 
    'system_tenant', 
    'System Tenant', 
    'admin@system.com', 
    true
)
on conflict (id) do nothing;

--rollback DELETE FROM public.tenant WHERE code = 'system_tenant';

--changeset lisandro.ortega:business_partner.002.1 context:dev,qa,prod
--comment: Insert default business partner

INSERT INTO public.business_partner
(id, tenant_id, identification_type_id, identification_number, first_name, last_name, email, readonly)
VALUES(
    'a1da4c26-6e28-4d64-86f2-7e78930f279c'::uuid, 
    '2cbbf66c-3230-4cbb-a4c5-dea0cb042652'::uuid, 
    (select id from identification_type where code = 'rif'), 
    '010101010', 
    'System', 
    'Admin', 
    'admin@system.com', 
    true
)
on conflict (id) do nothing;

--rollback DELETE FROM public.business_partner WHERE id = 'a1da4c26-6e28-4d64-86f2-7e78930f279c';

--changeset lisandro.ortega:app_user.002.1 context:dev,qa,prod
--comment: Insert default app user (system admin)

INSERT INTO public.app_user
(id, business_partner_id, role_id, status_id, username, password_hash, readonly)
VALUES(
    'a60fa5c0-d817-4a45-ad5d-78732aa8e1aa'::uuid, 
    'a1da4c26-6e28-4d64-86f2-7e78930f279c'::uuid, 
    (select id from role where code = 'super_admin'), 
    (select id from app_user_status where code = 'active'), 
    'system_tenant_user', 
    '$2b$10$UKVWVIkzcI0vZ.mxevGn6.svGp8qTHA/HjT18HRT9x1OizwAonIgC', -- admin123 
    true
)
on conflict (id) do nothing;

--rollback DELETE FROM public.app_user WHERE id = 'a60fa5c0-d817-4a45-ad5d-78732aa8e1aa';
