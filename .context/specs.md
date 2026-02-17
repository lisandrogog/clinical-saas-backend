# Especificaciones Técnicas (Specs)

## Diccionario de Estados (Enums)

- **OrderState (DocumentStatus):** `DRAFT`, `PENDING`, `SCHEDULED`, `IN_PROGRESS`, `CANCELLED`, `COMPLETED`.
- **AccessScope:** `OWN_RECORDS`, `UNIT_RECORDS`, `TENANT_RECORDS`, `ALL_RECORDS`.
- **AppModule:** `ORGANIZATION` , `SERVICE_CATALOG`, `SERVICE_PROVIDER`, `SERVICE_ORDER`, `PLATFORM_CATALOG`, `ACCESS_MANAGEMENT`, `PLATFORM_USERS`, `DOCUMENT_ENGINE_COMMON`, `DOCUMENT_ENGINE`.
- **AppUserRole:** `SUPER_ADMIN`, `TENANT_ADMIN`, `UNIT_ADMIN`, `UNIT_OPERATOR`.

## Entidades Principales (Resumen Prisma)

- **Tenant:** {id, identificationTypeId, identificationNumber, code, active }.
- **BusinessUnit:** { id, tenantId, code, active }.
- **BusinessPartner:** { id, tenantId, identificationTypeId, identificationNumber, email, isCustomer, isAgent, active }
- **AppUser:** { id, businessPartnerId, roleId, statusId, username, password_hash }.
- **ServiceOrder:** { id, tenantId, businessUnitId, customerId, agentId, documentStatusId, documentTypeId }.

## Reglas de Negocio Técnicas

- **ServiceOrder:** El documento se crea en estado `DRAFT`, pasa a estado `PENDING` hasta que es agendado. Luego de `SCHEDULED` a `IN_PROGRESS`, y finalmente pasa a estado `COMPLETADO`. Si algo sale mal operativamente, pasa a estado `CANCELADO`,
- **DocumentEngine:** Es el encargado de mover el documento por estos estados cuando se le indiquen las acciones correspondientes.
