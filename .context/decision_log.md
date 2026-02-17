## Historial de decisiones

| Fecha | Problema | Decisión | Razón |
| :---: | :---: | :---: | :---: |
| 2026-02-10 | Se requiere un **tech stack** para un MVP, con costos mínimos (o costo 0). | Se elige DB **PostgreSQL**, backend **NestJS** y Frontend **NextJS**. | Se puede tener un MVP con este **tech stack**, alojado en la capa gratuita de provedores como **supabase**, **render**, **netlify**... |
| 2026-02-10 | Versiones recientes de **node**, pueden ser inestables, tener problemas de compatibilidad o bugs no detectados. | Se usa **node v20.20.x**. | Es una versión de node relativamente reciente, y suficientemente estable. |
| 2026-02-10 | Versión reciente de **Prisma v7**, tiene problemas de compatibilidad y documentación muy pobre. | Se usa **Prisma v6**. | En la práctica, fué la menos problemática, y se encontró documentación suficiente para avanzar con el proyecto. |
| 2026-02-17 | Algunas entidades tienen **clave de unicidad** compuesta que incluye `removed_at` no nullable para `prisma.findUnique` o `prisma.upsert`. | Se usa `findFirst` en lugar de `findUnique` o `upsert` para entidades con `removed_at`. | Para evitar errores ya que `removed_at` es **nullable** en la BD. |
