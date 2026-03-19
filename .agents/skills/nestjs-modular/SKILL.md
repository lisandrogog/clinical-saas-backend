---
name: nestjs-modular-generator
description: Use esta habilidad cuando el usuario necesite crear módulos desacoplados en NestJS con la estructura de triada de servicios y decoradores Swagger separados.
---

# Skill: NestJS Modular Architecture Standard

## 🧠 Contexto y Rol
Actúa como un Ingeniero de Software Senior especializado en NestJS. Tu objetivo es generar y mantener módulos siguiendo una arquitectura de **bajo acoplamiento** y **alta cohesión**, diseñada para escalabilidad modular. Esta guía está basada en el patrón implementado en los módulos agrupados (ej. `src/modules/service-catalog`).

## 📂 Estructura de Directorios Obligatoria
Cuando se solicite o mantenga un módulo (ej. `nombre-modulo`) dentro de un agrupador (ej. `src/modules/service-catalog`), la estructura debe ser estrictamente esta:

```text
src/modules/{agrupador}/
└── {nombre-modulo}/
    ├── constants/
    │   └── i18n.constants.ts (Definición de SubModuleKeys e I18nKeys para errores y mensajes)
    ├── controllers/
    │   ├── {nombre-modulo}.controller.ts (Solo inyección de servicios y ruteo)
    │   └── {nombre-modulo}.decorator.ts (Aislación de anotaciones Swagger)
    ├── dto/
    │   ├── create-{nombre-modulo}.dto.ts
    │   ├── update-{nombre-modulo}.dto.ts
    │   ├── search-{nombre-modulo}.dto.ts (Opcional, si requiere parámetros de búsqueda)
    │   └── index.ts (Barrel export: export * from './...')
    ├── interfaces/
    │   ├── {nombre-modulo}-search.interface.ts (Opcional, tipado auxiliar para listas/búsquedas)
    │   └── index.ts (Barrel export, opcional)
    ├── services/
    │   ├── {nombre-modulo}.service.ts (Lógica principal de negocio y operaciones Core en BD)
    │   ├── {nombre-modulo}-helper.service.ts (Validaciones ej. assertExists, construcción de filtros)
    │   ├── {nombre-modulo}-{funcionalidad-especifica}.service.ts (Opcional, ej. -activation o -association)
    │   └── index.ts (Barrel export para todos los servicios)
    └── {nombre-modulo}.module.ts
```

## 🛠 Reglas de Implementación Técnica

### 1. Controllers y Decorators (Separación de Swagger)
- **Prohibido:** Colocar `@ApiOperation`, `@ApiResponse`, `@ApiTags`, o decoradores de documentación directamente en el `{nombre-modulo}.controller.ts`.
- **Obligatorio:** Crear un Custom Decorator en `{nombre-modulo}.decorator.ts` que agrupe toda la metadata de Swagger (usando `applyDecorators`). El controlador solo debe tener la lógica de routing `@Get()`, `@Post()` y la inyección de la metadata desde el Custom Decorator.
- **Headers y Custom Decorators:** Los controladores deben obtener el contexto y headers inyectando obligatoriamente estos custom decorators:
  ```typescript
  import { BusinessUnitId, TenantId, UserId } from '@modules/utils/decorators';

  // Inyección en parámetros del método:
  @TenantId() tenantId: string,
  @BusinessUnitId() businessUnitId: string,
  @UserId() userId?: string,
  ```

### 2. Orden de Parámetros Convencional (Controladores y Servicios)
Tanto en la firma de los métodos del Controlador como del Servicio, el orden de los parámetros (según existan y se requieran) debe ser siempre el siguiente:
1. `tenantId`
2. `businessUnitId`
3. `id` (identificador del recurso en rutas dinámicas)
4. `body` / `payload` / `dto` / `interface`
5. `userId`
*Nota: Los parámetros opcionales (típicamente `userId?`) se despriorizan y siempre se ubican al final en el orden de los parámetros.*

### 3. Triada de Servicios (Segregación de Lógica)
Para evitar "God Objects", divide la lógica en los siguientes servicios (y expórtalos en `index.ts`):
- **Core Service (`.service.ts`):** Orquestación principal, llamadas centralizadas al `PrismaService` y operaciones transaccionales de lectura/escritura (Create, Update, Get, Delete).
- **Helper Service (`-helper.service.ts`):** Centraliza aserciones de existencia (ej. `assertExistsService(id)`), chequeos pre-condición que lanzan excepciones HTTP (`NotFoundException`, `BadRequestException`) y la construcción de cláusulas complejas para el ORM (ej. `applySearchFilters(dto)`).
- **Domain/Specific Service (Opcional):** Si la lógica de activación de estados, asociación múltiple u otra característica es muy compleja, sepárala en un servicio con sufijo (ej. `-activation.service.ts` o `-association.service.ts`) para aliviar el Core Service.

### 4. Manejo de Constantes e Internacionalización
- **NO hardcodear** textos de error en código, usa: `constants/i18n.constants.ts`.
- Se debe exportar el objeto `I18nKeys` combinando un `SubModuleKeys.i18nKey` con valores estándar importados desde el index de i18n global (ej. `ErrorsI18n.NOT_FOUND`, `MessagesI18n.CREATE_SUCCESS`).

### 5. Persistencia y Migraciones
- **ORM:** Usa Prisma para todas las consultas a nivel de servicio (`this.prisma.service.findMany(...)`, etc).
- **Migraciones:** El proyecto usa Liquibase para gestionar DDL y migraciones. No generes ni propongas migraciones nativas de Prisma (`prisma migrate`). Si hay cambios en el esquema (`schema.prisma`), el flujo es que se debe crear paralelamente el archivo `.sql` o `.xml` en la carpeta de Liquibase.

### 6. Barrel Exports (Archivos Index)
- Las subcarpetas `dto` y `services` **deben obligatoriamente** tener un `index.ts`.
- Las importaciones entre carpetas del mismo nivel (ej. un servicio inyectando otro servicio del mismo módulo) y módulos foráneos deben apuntar al `index.ts` (Barrel pattern) para mantener limpio el bloque de dependencias.

### 7. Desarrollo de Búsquedas (Paginación y Filtros)
Si un módulo expone búsquedas de colecciones (endpoints tipo GET plurales), debes estructurarlo así:
- **Controlador (`@Query`):** Debes inyectar el paginador base usando `BaseSearchPaginationDto` ubicado en `@modules/utils/dto`. Ejemplo: `@Query() searchFilters: BaseSearchPaginationDto`.
- **Helper Service (`applySearchFilters`):** Delega la construcción de la cláusula `WHERE` del ORM (ej. `Prisma.TableWhereInput`) al helper en un método `applySearchFilters`. Si hay texto a buscar (`searchFilters.search`), debes inyectar el `UtilsService` de `@modules/utils/services` y usar `this.utils.sanitizeSearch(...)` para prevenir inyecciones antes de mandarlo a Prisma.
- **Interfaces Estrictas:** En `interfaces/`, crea un archivo `{nombre-modulo}-search.interface.ts` y declara obligatoriamente la estructura de retorno estricto usando `IPaginationMetadata`:
  ```typescript
  import { IPaginationMetadata } from '@modules/utils/interfaces';

  export interface IFeatureSearch {
    // ... tus fields
  }
  export interface IFeatureSearchResponse {
    data: IFeatureSearch[];
    meta: IPaginationMetadata;
  }
  ```

## 📝 Flujo Recomendado de Generación para Agentes / Devs
Ante la instrucción: "Crea el módulo 'feature' en el agrupador 'service-catalog'":
1. Revisa el `schema.prisma` para entender las entidades implicadas.
2. Crea jerárquicamente `constants`, `controllers`, `dto`, `interfaces`, `services`.
3. Crea las DTOs base (`create`, `update`, `search`), e insértalos en `dto/index.ts`.
4. Transcribe todo catálogo de mensajes requeridos en `i18n.constants.ts`.
5. Desarrolla `feature-helper.service.ts` codificando las aserciones que protegen la inserción/mutación (Validación de foráneas, duplicidad).
6. Desarrolla `feature.service.ts` (Core), inyectando el Helper Service para blindar sus métodos antes de aplicar Prisma insertions.
7. Registra ambos servicios en `services/index.ts`.
8. Diseña la capa estricta de Swagger en `feature.decorator.ts`.
9. Enlaza el decorador a los métodos de routing en un limpio `feature.controller.ts`.
10. Consolida los `providers` y `controllers` en `feature.module.ts`.

## 🚫 Restricciones (Constraints)
- **NO DEBES USAR any:** Tipado estricto es ley (usa `Prisma.TableWhereInput` si se requiere filtro condicional).
- **RESPETA LA JERARQUÍA:** No insertes la lógica de controller en los servicios ni viceversa. Ningún decorador Swagger en `.controller.ts`.
- **SEGREGACIÓN ESTRICTA:** Protecciones con "Thorw exceptions" y constructores de filtros (`where: Prisma.UserWhereInput`) mételos al Helper. Manejo de commit o listado directo, resérvalo en el Core Service.
