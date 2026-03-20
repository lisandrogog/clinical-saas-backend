# Estado Actual del Trabajo

## 🎯 Objetivo Inmediato

- Crear diccionario de traducciones

## 📑 Objetivos Próximos

- Crear modulo de traducciones simplificado (eventualmente será remplazado por módulo dinámico - DB)
- Agregar servicio para crear orden con item's en una transacción en estado inicial
- Agregar servicio para agendar orden
- Agregar servicio para gestionar cambio de estados de orden
- Agregar servicio para crear consulta (service-order-detail) a partir de una cita (service-order)
- Agregar servicio para crear consulta sin partir de una cita previa
- Parametrizar ordenamiento en busquedas
- Historial/log de cambios de estado de documentos (state_from, state_to, date_time, user_id)
- Remover controladores/métodos que no necesitan estar expuestos

## ✅ Avances Recientes

- Consolidación de la arquitectura modular de triada (Core y Helper Service) en los módulos de `service-order`.
- Separación estricta de decoradores Swagger (`*.decorator.ts`) e integración de `BaseSearchPaginationDto` para estandarizar búsquedas.
- Creación de `.agents/skills/nestjs-modular/SKILL.md` para asistir a las guías de código generativo.
- Integración del submódulo git `src/shared-common` para centralizar DTOs e interfaces transversales entre proyectos del ecosistema.
- Ajuste de lineamientos: los tipos comunes ya no deben mantenerse directamente en este proyecto si existen en shared-common.
- Módulo de salas? (servicio fisioterapia)
- Módulo de recursos materiales (service-material-resource, business-unit-material-resource)
- Dependencias del service-providers (service-provider-business-unit, service-provider-service)
- Módulo service-providers
- Hacer las migraciones de liquibase para los tipos comunes
- set price cost nullable, liquibase/ & sql/, dtos, services, controllers
- Valida los endpoint y payloads
- Búsquedas con filter, search y paginación
- Agregar fecha de nacimiento y dirección corta al cliente/paciente
- Verificar que la migración de liquibase se ejecute correctamente en el entorno remoto (CI/CD).
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

- Modulo de login y gestión del token jwt. (manejarlo con supabase?)
- Integración oauth/oauth2.
- Pruebas unitarias, modulares y e2e
- Agregar entidad transaccional de "permiso" o "vacación", para bloquear espacios de agenda de profesionales.
- Agregar entidad maestra para manejo de stoks de recursos por bu

## 📂 Archivos en Foco

- `src/modules/...`
- `prisma/schema.prisma`
