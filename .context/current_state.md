# Estado Actual del Trabajo

## 🎯 Objetivo Inmediato

- Seeders para agregar data de Tenant & usuario de sistemas, y Tenant/BU/usuarios demo.

## ✅ Avances Recientes

- Se completaron los crud's basicos de las entidades del backend.
- Se implementa Swagger/API-Docs en el proyecto.
- Se agregan Seeders de data mínima necesaria para el uso de la plataforma.

## 🚧 Bloqueos o Pendientes

- Agregar detalles de documentación Swagger, en métodos de Controladores y DTOs.
- Historial/log de cambios de estado de documentos (state_from, state_to, date_time, user_id)
- Servicio documentworkflowService para gestionar las acciones del document-engine.
- Servicios de acciones y flujos operativos.
- Modulo de login y gestión del token jwt.
- Integración oauth/oauth2.
- Pruebas unitarias, modulares y e2e

## 📂 Archivos en Foco

- `src/modules/...`
- `prisma/schema.prisma`
