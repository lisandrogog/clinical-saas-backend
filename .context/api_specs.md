# Especificaciones de la API (Endpoints)

## Configuración Común
- **Headers Requeridos**:
  - `x-tenant-id`: UUID - Identificador de la Organización (Tenant).
  - `x-user-id`: UUID (Opcional) - ID del usuario que realiza la operación.

---

## Módulo: Platform Customers

### Customer (`/customer`)
Gestión de clientes/pacientes.

- `POST /customer`: Registrar nuevo cliente.
  - **Payload**: `CreateCustomerDto`
- `GET /customer`: Listado paginado de clientes.
  - **Query**: `BaseSearchPaginationDto`
- `GET /customer/:id`: Detalle de un cliente por ID (UUID).
- `PATCH /customer/:id`: Actualizar información básica.
  - **Payload**: `UpdateCustomerDto`
- `PATCH /customer/:id/disable`: Desactivar cuenta del cliente.
- `PATCH /customer/:id/enable`: Reactivar cuenta del cliente.
- `DELETE /customer/:id`: Eliminar un cliente (soft delete).

---

## Módulo: Service Catalog

### Service Category (`/service-category`)
Categorías de servicios ofrecidos.

- `POST /service-category`: Crear nueva categoría.
  - **Payload**: `CreateServiceCategoryDto`
- `GET /service-category`: Consultar categorías existentes.
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-category/:id`: Obtener categoría por ID.
- `GET /service-category/code/:code`: Buscar categoría por código único.
- `PATCH /service-category/:id`: Editar categoría.
  - **Payload**: `UpdateServiceCategoryDto`
- `DELETE /service-category/:id`: Eliminar categoría (soft delete).

### Service (`/service`)
Definición de servicios individuales.

- `POST /service`: Crear nuevo servicio.
  - **Payload**: `CreateServiceDto`
- `GET /service`: Listar servicios con filtros.
  - **Query**: `SearchServiceDto`
- `GET /service/:id`: Obtener servicio por ID.
- `GET /service/code/:code`: Obtener servicio por código.
- `PATCH /service/:id`: Editar servicio.
  - **Payload**: `UpdateServiceDto`
- `PATCH /service/:id/disable`: Deshabilitar servicio.
- `PATCH /service/:id/enable`: Habilitar servicio.
- `DELETE /service/:id`: Eliminar servicio (soft delete).

### Service Business Unit (`/service-business-unit`)
Relación entre servicios y unidades de negocio (Sede/Sucursal).

- `POST /service-business-unit`: Crear asociación individual.
  - **Payload**: `CreateServiceBusinessUnitDto`
- `GET /service-business-unit/:id`: Ver detalle de asociación.
- `GET /service-business-unit/units/:serviceId`: Unidades asociadas a un servicio.
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-business-unit/services/:businessUnitId`: Servicios asociados a una unidad de negocio.
  - **Query**: `BaseSearchPaginationDto`
- `PATCH /service-business-unit/associate-services`: Asociación masiva de servicios a una unidad de negocio.
  - **Payload**: `AssociateServicesDto`
- `PATCH /service-business-unit/associate-units`: Asociación masiva de unidades de negocio a un servicio.
  - **Payload**: `AssociateUnitsDto`
- `PATCH /service-business-unit/:id`: Actualizar asociación.
  - **Payload**: `UpdateServiceBusinessUnitDto`
- `DELETE /service-business-unit/:id`: Eliminar asociación.

---

## Módulo: Materials Management

### Service Material Resource (`/service-material-resource`)
Relación entre servicios y recursos materiales.

- `PUT /service-material-resource`: Crear o actualizar la relación de materiales de un servicio.
  - **Payload**: `CreateServiceMaterialResourceDto`
- `GET /service-material-resource/:serviceId`: Obtener materiales de un servicio.
  - **Query**: `BaseSearchPaginationDto`
- `DELETE /service-material-resource/:serviceId/material/:materialResourceId`: Eliminar una relación material-servicio.

### Business Unit Material Resource (`/business-unit-material-resource`)
Gestión del inventario de materiales en una unidad de negocio.

- `POST /business-unit-material-resource`: Registrar material en una unidad.
  - **Payload**: `CreateBusinessUnitMaterialResourceDto`
- `GET /business-unit-material-resource/units`: Consultar en qué unidades está un material.
- `GET /business-unit-material-resource/materials`: Consultar materiales de una unidad.
- `GET /business-unit-material-resource/:id`: Obtener el detalle de un registro por ID.
- `PATCH /business-unit-material-resource/:id`: Actualizar la cantidad u otros datos del material en la unidad.
  - **Payload**: `UpdateBusinessUnitMaterialResourceDto`
- `DELETE /business-unit-material-resource/:id`: Eliminar un registro de inventario.

