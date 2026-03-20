# Arquitectura del Sistema

## Multi-tenancy (Aislamiento)

- El aislamiento es a nivel de base de datos usando las columnas `tenant_id` & en menor medida `business_unit_id`.
- [ IGNORAR ESTA LINEA. PLACEHOLDER ] El `OrganizationInterceptor` extrae el ID del header `x-tenant-id` y lo inyecta en el Request.

## Estándar Modular (NestJS)

La aplicación implementa un patrón estricto de **Triada de Módulos**, diseñado en `.agents/skills/nestjs-modular/SKILL.md`:

- **Controllers y Routing**: Archivos `*.controller.ts` para capturar requerimientos, segregados completamente de decoradores Swagger que residen obligatoriamente en `*.decorator.ts`.
- **Triada de Servicios**:
  - `Core Service` (`.service.ts`): Ejecución de rutinas nativas del negocio mutativo (transacciones `.findMany`, `.createMany`, updates sobre DB).
  - `Helper Service` (`-helper.service.ts`): Reúne métodos de salvaguarda pre-requisitos (`assertExists`) y procesamiento/limpieza de condiciones `WHERE` dinámicas previas a la inyección al ORM.

## Tipos Compartidos (Git Submodule)

- El repositorio backend integra `src/shared-common` como **git submodule** para centralizar DTOs e interfaces transversales.
- Los módulos de negocio deben importar estos tipos desde shared-common (alias `@shared-common` o ruta definida en `tsconfig`).
- Objetivo: evitar divergencias de contrato entre servicios y reducir duplicación de clases DTO/interfaces locales.
- Regla práctica: antes de crear un nuevo DTO/interface local, verificar primero si ya existe en `src/shared-common`.

## Flujo de Documentos Clínicos

1. Se crea un Documento de `ServiceOrder` en estado inicial `DRAFT` o `PENDING`.
2. El `DocumentWorkflowService` puede cambiar el estado del Documento bajo demanda a `SCHEDULED` o `IN_PROGRESS`.
3. De `IN_PROGRESS` puede ser movido a `COMPLETED`.
4. El Documento también puede ser devuelto de `IN_PROGRESS` a `PENDING`.
5. Puede ser movido desde `PENDING` o `SCHEDULED` a `CANCELED`.

## Gestión de Base de Datos y Migraciones

- **Esquema y Migraciones**: Se utiliza **Liquibase** como herramienta principal para gestionar los cambios en el esquema de la base de datos. Los archivos de log (changelogs) se encuentran en la carpeta `liquibase/`.
- **Acceso a Datos**: Se utiliza **Prisma** como ORM para la interacción con los datos desde la aplicación. El esquema de Prisma (`prisma/schema.prisma`) debe mantenerse sincronizado con la base de datos (usando `npx prisma db pull` si es necesario) para garantizar la consistencia de los tipos y el cliente.

## Manejo de Transacciones

- [ IGNORAR ESTA LINEA. PLACEHOLDER ] Usar `$transaction` de Prisma para operaciones que involucren `Order` y `Inventory` simultáneamente.
