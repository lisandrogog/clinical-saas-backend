# Manual de Estilo de Código

## TypeScript & NestJS

- **Naming:** Clases en `PascalCase`, archivos y carpetas en `kebab-case`. Constantes y enums en `SCREAMING_SNAKE_CASE`. Variables locales y metodos en `lowerCamelCase`.
- **Async:** Siempre usar `async/await` en lugar de `.then()`.
- **Inyección de Dependencias:** Usar `constructor(private readonly service: Service) {}`.
- **DTOs:** Todos los inputs de controllers deben tener un DTO con `@IsString()`, `@IsOptional()`, etc.

## Base de Datos (Prisma)

- No exponer modelos de Prisma directamente en los controllers; mapear siempre a DTOs o Entities.
- Los nombres de las tablas en `schema.prisma` deben estar en `snake_case`.

## Respuesta de API

- Formato estándar: `{ success: boolean, data: T, message?: string }`.
