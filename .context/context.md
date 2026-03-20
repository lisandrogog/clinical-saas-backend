# Contexto Global: Backend SaaS Médico

## Visión General

Backend para una plataforma SaaS multi-tenant de gestión médica y pediátrica.
**Arquitectura:** Modular, escalable y orientada a dominios.

## Stack Técnico (Fijo)

- **Runtime:** Node.js (v20.20.x)
- **Framework:** NestJS + TypeScript
- **ORM:** Prisma (v6)
- **Migraciones:** Liquibase (v4.25.0)
- **DB:** PostgreSQL
- **Tests:** Jest (e2e en carpeta `/test`)

## Reglas de Colaboración (Estándares)

- **Estructura:** Seguir estrictamente el patrón de módulos de NestJS.
- **Lógica:** La lógica de negocio reside en Services. Los Controllers solo manejan entrada/salida.
- **Validación:** Uso obligatorio de DTOs con class-validator para cada endpoint.
- **Tipos Transversales:** DTOs e interfaces compartidas deben consumirse desde el submódulo `src/shared-common`.
- **No Duplicación:** No mantener copias locales en `src/modules/**/dto` o `src/modules/**/interfaces` si el tipo ya existe en shared-common.
- **Base de Datos:** No usar SQL crudo a menos que sea necesario; priorizar Prisma API para consultas. Las migraciones via **Liquibase** son la única fuente de verdad para el esquema de la base de datos.
- **Multi-tenancy:** Siempre validar el `tenantId` en las consultas.
- **Operabilidad API:** Mantener `GET /health` (liveness) y `GET /health/ready` (readiness con check DB) como endpoints técnicos sin headers multi-tenant obligatorios.
