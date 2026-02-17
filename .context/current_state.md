# Estado Actual del Trabajo

## 🎯 Objetivo Inmediato

- Seeder Oŕdenes de servicio agendada y completada con su documento derivado.

## ✅ Avances Recientes

- Se agregan Seeders de data mínima necesaria para el uso de la plataforma.
- Seeders para agregar data de Tenant & usuario de sistemas, y Tenant/BU/usuarios demo.
- Seeders Servicios, Clientes, Profesionales(servicios).
- Seeder Agenda de profesionales.

## 🚧 Bloqueos o Pendientes

- Agregar detalles de documentación Swagger, en métodos de Controladores y DTOs.
- Historial/log de cambios de estado de documentos (state_from, state_to, date_time, user_id)
- Servicio documentworkflowService para gestionar las acciones del document-engine.
- Servicios de acciones y flujos operativos.
- Modulo de login y gestión del token jwt.
- Integración oauth/oauth2.
- Pruebas unitarias, modulares y e2e
- Búsquedas con filter, search y paginación
- permitir crear consulta médica(oder-details) sin cita previa(service-order). crear las dependencias en background.

## 📂 Archivos en Foco

- `src/modules/...`
- `prisma/schema.prisma`
