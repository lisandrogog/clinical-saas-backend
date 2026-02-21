# Estado Actual del Trabajo

## 🎯 Objetivo Inmediato

- Verificar que la migración de liquibase se ejecute correctamente en el entorno remoto (CI/CD).

## 📑 Objetivos Próximos

- Agregar fecha de nacimiento y dirección corta al cliente/paciente
- Agregar servicio para crear orden con itemes en una transacción en estado inicial
- Agregar servicio para agendar orden
- Agregar servicio para gestionar cambio de estados de orden
- Agregar servicio para crear consulta (service-order-detail) a partir de una cita (service-order)
- Agregar servicio para crear consulta sin partir de una cita previa
- Búsquedas con filter, search y paginación
- Historial/log de cambios de estado de documentos (state_from, state_to, date_time, user_id)
- Remover controladores/métodos que no necesitan estar expuestos

## ✅ Avances Recientes

- Implementar liquibase para migraciones de BD
- Agrega controlador+servicio de clientes/pacientes
- Establece conexión con supabase
- Agrega manejo de env files
- Agrega Dockerfile y deploy.yml
- Implementar document workflow: executeAction
- Implementar document workflow: getActions,
- Se agregan Seeders de data mínima necesaria para el uso de la plataforma.
- Seeders para agregar data de Tenant & usuario de sistemas, y Tenant/BU/usuarios demo.
- Seeders Servicios, Clientes, Profesionales(servicios).
- Seeder Agenda de profesionales.
- Seeder Oŕdenes de servicio agendada y completada con su documento derivado.
- Probar seeder y corregir errores (si los hay).

## 🚧 Bloqueos o Pendientes

- Agregar detalles de documentación Swagger, en métodos de Controladores y DTOs.
- Modulo de login y gestión del token jwt.
- Integración oauth/oauth2.
- Pruebas unitarias, modulares y e2e
- Agregar entidad transaccional de "permiso" o "vacación", para bloquear espacios de agenda de profesionales.
- Investigar integración supabase.
- Investigar gestión de sesión supabase.

## 📂 Archivos en Foco

- `src/modules/...`
- `prisma/schema.prisma`
