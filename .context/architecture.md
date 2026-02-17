# Arquitectura del Sistema

## Multi-tenancy (Aislamiento)

- El aislamiento es a nivel de base de datos usando las columnas `tenant_id` & en menor medida `business_unit_id`.
- [ IGNORAR ESTA LINEA. PLACEHOLDER ] El `OrganizationInterceptor` extrae el ID del header `x-tenant-id` y lo inyecta en el Request.

## Flujo de Documentos Clínicos

1. Se crea un Documento de `ServiceOrder` en estado inicial `DRAFT` o `PENDING`.
2. El `DocumentWorkflowService` puede cambiar el estado del Documento bajo demanda a `SCHEDULED` o `IN_PROGRESS`.
3. De `IN_PROGRESS` puede ser movido a `COMPLETED`.
4. El Documento también puede ser devuelto de `IN_PROGRESS` a `PENDING`.
5. Puede ser movido desde `PENDING` o `SCHEDULED` a `CANCELED`.

## Manejo de Transacciones

- [ IGNORAR ESTA LINEA. PLACEHOLDER ] Usar `$transaction` de Prisma para operaciones que involucren `Order` y `Inventory` simultáneamente.
