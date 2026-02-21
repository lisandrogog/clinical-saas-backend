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
- **Base de Datos:** No usar SQL crudo a menos que sea necesario; priorizar Prisma API para consultas. Las migraciones via **Liquibase** son la única fuente de verdad para el esquema de la base de datos.
- **Multi-tenancy:** Siempre validar el `tenantId` en las consultas.
