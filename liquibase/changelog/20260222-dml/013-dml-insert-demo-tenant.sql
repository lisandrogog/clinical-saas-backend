--liquibase Formatted SQL

--changeset lisandro.ortega:tenant.003.1 context:dev,qa,prod
--comment: Insert demo tenant

INSERT INTO public.tenant
(id, identification_type_id, identification_number, code, business_name)
VALUES(
  '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, 
  (select id from identification_type where code = 'rif'), 
  '0123456789', 
  'demo_healthcare', 
  'Demo Healthcare');
on conflict (id) do nothing;

--rollback DELETE FROM public.tenant WHERE code = 'demo_healthcare';

--changeset lisandro.ortega:business_unit.003.1 context:dev,qa,prod
--comment: Insert demo tenant business units Consultorios Médicos

INSERT INTO public.business_unit
(id, tenant_id, code, business_name)
VALUES(
  '019c6e57-c95d-7846-829c-873bbd42607e'::uuid, 
  '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, 
  'CST-CONSULT', 
  'Consultorios Médicos');
on conflict (id) do nothing;

--rollback DELETE FROM public.business_unit WHERE id = '019c6e57-c95d-7846-829c-873bbd42607e';

--changeset lisandro.ortega:business_unit.004.1 context:dev,qa,prod
--comment: Insert demo tenant business units Laboratorio Clínico

INSERT INTO public.business_unit
(id, tenant_id, code, business_name)
VALUES(
  '019c6e57-c95d-7846-829c-873cb6c6f97a'::uuid, 
  '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, 
  'CST-LAB', 
  'Laboratorio Clínico');
on conflict (id) do nothing;

--rollback DELETE FROM public.business_unit WHERE id = '019c6e57-c95d-7846-829c-873cb6c6f97a';

--changeset lisandro.ortega:business_partner.003.1 context:dev,qa,prod
--comment: Insert demo tenant business partners

INSERT INTO public.business_partner
(id, tenant_id, identification_type_id, identification_number, first_name, last_name, email)
VALUES
('d5617a2a-386c-476f-9e07-b1bc9f0dc7a9'::uuid, '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, (select id from identification_type where code = 'rif' and readonly = true limit 1), '012345678-1', 'Tenant', 'Admin', 'admin.tenant@healthcare.com'),
('a2a85e3f-c483-4743-bdcb-9b59b7eda59f'::uuid, '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, (select id from identification_type where code = 'rif' and readonly = true limit 1), '012345678-2', 'Unit', 'Admin', 'admin.unit@healthcare.com'),
('1c255d79-7594-4584-9f1b-1b91aed9225e'::uuid, '019c6e57-c95c-7b61-b4e0-f57f39065347'::uuid, (select id from identification_type where code = 'rif' and readonly = true limit 1), '012345678-3', 'Unit', 'Operator', 'operator.unit@healthcare.com')
on conflict (id) do nothing;

--rollback DELETE FROM public.business_partner WHERE id = 'd5617a2a-386c-476f-9e07-b1bc9f0dc7a9';
--rollback DELETE FROM public.business_partner WHERE id = 'a2a85e3f-c483-4743-bdcb-9b59b7eda59f';
--rollback DELETE FROM public.business_partner WHERE id = '1c255d79-7594-4584-9f1b-1b91aed9225e';

--changeset lisandro.ortega:app_user.003.1 context:dev,qa,prod
--comment: Insert demo tenant users

INSERT INTO public.app_user
(id, business_partner_id, role_id, status_id, username, password_hash)
VALUES
('019c6e57-c9c4-72d5-b486-e3c0028c8e95'::uuid, 'd5617a2a-386c-476f-9e07-b1bc9f0dc7a9'::uuid, '019c6e4a-2713-720c-830d-8f49c164176a'::uuid, 2, 'admin.tenant', '$2b$10$Rp3NKPCWhnbPr7ADk4681.Q7xh2cYkpAgCXn73v2MaCxD6NfWsQV6'), -- Admin123.
('019c6e57-c9f5-72f6-ad26-daa3d1cdce2b'::uuid, 'a2a85e3f-c483-4743-bdcb-9b59b7eda59f'::uuid, '019c6e4a-2715-7876-82ab-cc0f7553cb45'::uuid, 2, 'admin.unit', '$2b$10$PaFnyLSZkJHl/2XZaXntg.IJ9snZ3wzC4bkpkicQ88WIv4Ely76s2'), -- Unit123.
('019c6e57-ca26-7424-86c7-9e7f2007dfa2'::uuid, '1c255d79-7594-4584-9f1b-1b91aed9225e'::uuid, '019c6e4a-2717-743d-9493-4a269eca77ac'::uuid, 2, 'operator.unit', '$2b$10$zEnL/K38lH1pV61MLUiAMObpRSAMfLHM67tD1GWGxbH8p1bwGazzy') -- Opera123.
on conflict (id) do nothing;

--rollback DELETE FROM public.app_user WHERE id = '019c6e57-c9c4-72d5-b486-e3c0028c8e95';
--rollback DELETE FROM public.app_user WHERE id = '019c6e57-c9f5-72f6-ad26-daa3d1cdce2b';
--rollback DELETE FROM public.app_user WHERE id = '019c6e57-ca26-7424-86c7-9e7f2007dfa2';

--changeset lisandro.ortega:app_user_business_unit.003.1 context:dev,qa,prod
--comment: Insert demo tenant app user business units

insert into app_user_business_unit (app_user_id, business_unit_id) 
values
('019c6e57-c9c4-72d5-b486-e3c0028c8e95'::uuid, '019c6e57-c95d-7846-829c-873bbd42607e'::uuid),
('019c6e57-c9f5-72f6-ad26-daa3d1cdce2b'::uuid, '019c6e57-c95d-7846-829c-873bbd42607e'::uuid),
('019c6e57-ca26-7424-86c7-9e7f2007dfa2'::uuid, '019c6e57-c95d-7846-829c-873bbd42607e'::uuid),
('019c6e57-c9c4-72d5-b486-e3c0028c8e95'::uuid, '019c6e57-c95d-7846-829c-873cb6c6f97a'::uuid),
('019c6e57-c9f5-72f6-ad26-daa3d1cdce2b'::uuid, '019c6e57-c95d-7846-829c-873cb6c6f97a'::uuid),
('019c6e57-ca26-7424-86c7-9e7f2007dfa2'::uuid, '019c6e57-c95d-7846-829c-873cb6c6f97a'::uuid)
on conflict (app_user_id, business_unit_id) do nothing;

--rollback DELETE FROM public.app_user_business_unit WHERE app_user_id = '019c6e57-c9c4-72d5-b486-e3c0028c8e95';
--rollback DELETE FROM public.app_user_business_unit WHERE app_user_id = '019c6e57-c9f5-72f6-ad26-daa3d1cdce2b';
--rollback DELETE FROM public.app_user_business_unit WHERE app_user_id = '019c6e57-ca26-7424-86c7-9e7f2007dfa2';
