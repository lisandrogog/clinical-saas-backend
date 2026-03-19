# Especificaciones de la API (Endpoints)

## Configuración Común
- **Headers Requeridos**:
  - `tenantId` / `x-tenant-id`: UUID - Identificador de la Organización (Tenant).
  - `businessUnitId` / `x-business-unit-id`: UUID - Identificador de la Unidad de Negocio.
  - `userId` / `x-user-id`: UUID (Opcional) - ID del usuario que realiza la operación.

---

## Módulo: Access Management

### Access Scope (`/access-scope`)

- `POST /access-scope`
  - **Payload**: `CreateAccessScopeDto`
- `GET /access-scope`
- `GET /access-scope/:id`
  - **Payload**: `UpdateAccessScopeDto`
- `GET /access-scope/code/:code`
  - **Payload**: `UpdateAccessScopeDto`
- `PATCH /access-scope/:id`
  - **Payload**: `UpdateAccessScopeDto`
- `PUT /access-scope`
  - **Payload**: `UpdateAccessScopeDto`

### Permission (`/permission`)

- `POST /permission`
  - **Payload**: `CreatePermissionDto`
- `GET /permission`
- `GET /permission/:id`
- `GET /permission/role/:roleId`
- `GET /permission/module/:moduleId`
  - **Payload**: `UpdatePermissionDto`
- `GET /permission/sub-module/:subModuleId`
  - **Payload**: `UpdatePermissionDto`
- `PATCH /permission/:id`
  - **Payload**: `UpdatePermissionDto`
- `DELETE /permission/:id`

### Permission Type (`/permission-type`)

- `POST /permission-type`
  - **Payload**: `CreatePermissionTypeDto`
- `GET /permission-type`
- `GET /permission-type/:id`
  - **Payload**: `UpdatePermissionTypeDto`
- `GET /permission-type/code/:code`
  - **Payload**: `UpdatePermissionTypeDto`
- `PATCH /permission-type/:id`
  - **Payload**: `UpdatePermissionTypeDto`
- `PUT /permission-type`
  - **Payload**: `UpdatePermissionTypeDto`

### Role (`/role`)

- `POST /role`
  - **Payload**: `CreateRoleDto`
- `GET /role`
- `GET /role/:id`
  - **Payload**: `UpdateRoleDto`
- `GET /role/code/:code`
  - **Payload**: `UpdateRoleDto`
- `PATCH /role/:id`
  - **Payload**: `UpdateRoleDto`
- `DELETE /role/:id`

---

## Módulo: Document Engine Common

### Document Action (`/document-action`)

- `POST /document-action`
  - **Payload**: `CreateDocumentActionDto`
- `GET /document-action`
- `GET /document-action/:id`
  - **Payload**: `UpdateDocumentActionDto`
- `GET /document-action/code/:code`
  - **Payload**: `UpdateDocumentActionDto`
- `PATCH /document-action/:id`
  - **Payload**: `UpdateDocumentActionDto`
- `PUT /document-action`
  - **Payload**: `UpdateDocumentActionDto`

### Document Status (`/document-status`)

- `POST /document-status`
  - **Payload**: `CreateDocumentStatusDto`
- `GET /document-status`
- `GET /document-status/:id`
  - **Payload**: `UpdateDocumentStatusDto`
- `GET /document-status/code/:code`
  - **Payload**: `UpdateDocumentStatusDto`
- `PATCH /document-status/:id`
  - **Payload**: `UpdateDocumentStatusDto`
- `PUT /document-status`
  - **Payload**: `UpdateDocumentStatusDto`

### Document Type (`/document-type`)

- `POST /document-type`
  - **Payload**: `CreateDocumentTypeDto`
- `GET /document-type`
- `GET /document-type/:id`
  - **Payload**: `UpdateDocumentTypeDto`
- `GET /document-type/code/:code`
  - **Payload**: `UpdateDocumentTypeDto`
- `PATCH /document-type/:id`
  - **Payload**: `UpdateDocumentTypeDto`
- `PUT /document-type`
  - **Payload**: `UpdateDocumentTypeDto`

---

## Módulo: Document Workflow

### Document Engine (`/document-engine`)

- `POST /document-engine`
  - **Payload**: `CreateDocumentEngineDto`
- `GET /document-engine`
- `GET /document-engine/:documentTypeId`
  - **Payload**: `UpdateDocumentEngineDto`
- `GET /document-engine/:id`
  - **Payload**: `UpdateDocumentEngineDto`
- `PATCH /document-engine/:id`
  - **Payload**: `UpdateDocumentEngineDto`
- `DELETE /document-engine/:id`

### Document Engine Item (`/document-engine-item`)

- `POST /document-engine-item`
  - **Payload**: `CreateDocumentEngineItemDto`
- `GET /document-engine-item/all/:documentEngineId`
- `DELETE /document-engine-item/all/:documentEngineId`

### Document Workflow (`/document-workflow`)

- `GET /document-workflow/actions/:documentId`
- `POST /document-workflow/actions/:documentId`

---

## Módulo: Materials

### Business Unit Material Resource (`/business-unit-material-resource`)

- `POST /business-unit-material-resource`
  - **Payload**: `CreateBusinessUnitMaterialResourceDto`
- `GET /business-unit-material-resource/units`
  - **Query**: `Omit`
- `GET /business-unit-material-resource/materials`
  - **Query**: `BaseSearchPaginationDto`
- `GET /business-unit-material-resource/:id`
- `PATCH /business-unit-material-resource/:id`
  - **Payload**: `UpdateBusinessUnitMaterialResourceDto`
- `DELETE /business-unit-material-resource/:id`

### Material Resource (`/material-resource`)

- `POST /material-resource`
  - **Payload**: `CreateMaterialResourceDto`
  - **Query**: `BaseSearchPaginationDto`
- `GET /material-resource`
  - **Query**: `BaseSearchPaginationDto`
- `GET /material-resource/:id`
- `GET /material-resource/code/:code`
  - **Payload**: `UpdateMaterialResourceDto`
- `PATCH /material-resource/:id`
  - **Payload**: `UpdateMaterialResourceDto`
- `PATCH /material-resource/:id/disable`
- `PATCH /material-resource/:id/enable`
- `DELETE /material-resource/:id`

### Material Resource Type (`/material-resource-type`)

- `POST /material-resource-type`
  - **Payload**: `CreateMaterialResourceTypeDto`
- `GET /material-resource-type`
- `GET /material-resource-type/:id`
- `GET /material-resource-type/code/:code`
  - **Payload**: `UpdateMaterialResourceTypeDto`
- `PATCH /material-resource-type/:id`
  - **Payload**: `UpdateMaterialResourceTypeDto`
- `DELETE /material-resource-type/:id`

### Service Material Resource (`/service-material-resource`)

- `PUT /service-material-resource`
  - **Payload**: `CreateServiceMaterialResourceDto`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-material-resource/:serviceId`
  - **Query**: `BaseSearchPaginationDto`
- `DELETE /service-material-resource/:serviceId/material/:materialResourceId`

---

## Módulo: Organization

### Business Partner (`/business-partner`)

- `POST /business-partner`
  - **Payload**: `CreateBusinessPartnerDto`
- `GET /business-partner`
- `GET /business-partner/:id`
- `GET /business-partner/identification`
- `PATCH /business-partner/:id`
  - **Payload**: `UpdateBusinessPartnerDto`
- `DELETE /business-partner/:id`

### Business Partner Business Unit (`/business-partner-business-unit`)

- `POST /business-partner-business-unit`
- `GET /business-partner-business-unit/partners`
- `GET /business-partner-business-unit/units`
- `GET /business-partner-business-unit/:id`
- `DELETE /business-partner-business-unit/:id`

### Business Unit (`/business-unit`)

- `POST /business-unit`
  - **Payload**: `CreateBusinessUnitDto`
- `GET /business-unit`
- `GET /business-unit/:id`
- `GET /business-unit/code/:code`
  - **Payload**: `UpdateBusinessUnitDto`
- `PATCH /business-unit/:id`
  - **Payload**: `UpdateBusinessUnitDto`
- `DELETE /business-unit/:id`

### Identification Type (`/identification-type`)

- `POST /identification-type`
  - **Payload**: `CreateIdentificationTypeDto`
- `GET /identification-type`
- `GET /identification-type/:id`
  - **Payload**: `UpdateIdentificationTypeDto`
- `GET /identification-type/code/:code`
  - **Payload**: `UpdateIdentificationTypeDto`
- `PATCH /identification-type/:id`
  - **Payload**: `UpdateIdentificationTypeDto`
- `PUT /identification-type`
  - **Payload**: `UpdateIdentificationTypeDto`

### Tenant (`/tenant`)

- `POST /tenant`
  - **Payload**: `CreateTenantDto`
- `GET /tenant`
- `GET /tenant/:id`
- `GET /tenant/code/:code`
- `GET /tenant/identification`
  - **Payload**: `UpdateTenantDto`
- `PATCH /tenant/:id`
  - **Payload**: `UpdateTenantDto`

---

## Módulo: Platform Catalog

### App Module (`/app-module`)

- `POST /app-module`
  - **Payload**: `CreateAppModuleDto`
- `GET /app-module`
- `GET /app-module/:id`
- `GET /app-module/code/:code`
  - **Payload**: `UpdateAppModuleDto`
- `PATCH /app-module/:id`
  - **Payload**: `UpdateAppModuleDto`
- `PUT /app-module`
  - **Payload**: `UpdateAppModuleDto`

### App Sub Module (`/app-sub-module`)

- `POST /app-sub-module`
  - **Payload**: `CreateAppSubModuleDto`
- `GET /app-sub-module`
- `GET /app-sub-module/:id`
  - **Payload**: `UpdateAppSubModuleDto`
- `GET /app-sub-module/code/:code`
  - **Payload**: `UpdateAppSubModuleDto`
- `PATCH /app-sub-module/:id`
  - **Payload**: `UpdateAppSubModuleDto`
- `PUT /app-sub-module`
  - **Payload**: `UpdateAppSubModuleDto`

### Platform (`/platform`)

- `POST /platform`
  - **Payload**: `CreatePlatformDto`
- `GET /platform`
- `GET /platform/:id`
  - **Payload**: `UpdatePlatformDto`
- `GET /platform/code/:code`
  - **Payload**: `UpdatePlatformDto`
- `PATCH /platform/:id`
  - **Payload**: `UpdatePlatformDto`
- `PUT /platform`
  - **Payload**: `UpdatePlatformDto`

---

## Módulo: Platform Customer

### Customer (`/customer`)

- `POST /customer`
  - **Payload**: `CreateCustomerDto`
  - **Query**: `BaseSearchPaginationDto`
- `GET /customer`
  - **Query**: `BaseSearchPaginationDto`
- `GET /customer/:id`
  - **Payload**: `UpdateCustomerDto`
- `PATCH /customer/:id`
  - **Payload**: `UpdateCustomerDto`
- `PATCH /customer/:id/disable`
- `PATCH /customer/:id/enable`
- `DELETE /customer/:id`

---

## Módulo: Platform Users

### App User (`/app-user`)

- `POST /app-user`
  - **Payload**: `CreateAppUserDto`
- `GET /app-user`
- `GET /app-user/:id`
- `GET /app-user/username/:username`
- `GET /app-user/email/:email`
  - **Payload**: `UpdateAppUserDto`
- `PATCH /app-user/:id`
  - **Payload**: `UpdateAppUserDto`
- `DELETE /app-user/:id`

### App User Business Unit (`/app-user-business-unit`)

- `POST /app-user-business-unit`
  - **Payload**: `CreateAppUserBusinessUnitDto`
- `GET /app-user-business-unit/users`
- `GET /app-user-business-unit/units`
- `GET /app-user-business-unit/:id`
- `DELETE /app-user-business-unit/:id`

### App User Status (`/app-user-status`)

- `POST /app-user-status`
  - **Payload**: `CreateAppUserStatusDto`
- `GET /app-user-status`
- `GET /app-user-status/:id`
  - **Payload**: `UpdateAppUserStatusDto`
- `GET /app-user-status/code/:code`
  - **Payload**: `UpdateAppUserStatusDto`
- `PATCH /app-user-status/:id`
  - **Payload**: `UpdateAppUserStatusDto`
- `PUT /app-user-status`
  - **Payload**: `UpdateAppUserStatusDto`

---

## Módulo: Rooms

### Business Unit Room (`/business-unit-room`)

- `POST /business-unit-room`
  - **Payload**: `CreateBusinessUnitRoomDto`
- `GET /business-unit-room`
  - **Query**: `BaseSearchPaginationDto`
- `GET /business-unit-room/:id`
- `GET /business-unit-room/code/:code`
- `PATCH /business-unit-room/:id`
  - **Payload**: `UpdateBusinessUnitRoomDto`
- `PATCH /business-unit-room/:id/disable`
- `PATCH /business-unit-room/:id/enable`
- `DELETE /business-unit-room/:id`

### Business Unit Room Material (`/business-unit-room-material`)

- `POST /business-unit-room-material`
  - **Payload**: `CreateBusinessUnitRoomMaterialDto`
- `GET /business-unit-room-material/materials/:roomId`
  - **Query**: `BaseSearchPaginationDto`
- `GET /business-unit-room-material/:id`
- `PATCH /business-unit-room-material/:id`
  - **Payload**: `CreateBusinessUnitRoomMaterialDto`
- `DELETE /business-unit-room-material/:id`

### Business Unit Room Service (`/business-unit-room-service`)

- `POST /business-unit-room-service`
  - **Payload**: `BusinessUnitRoomServiceDto`
- `POST /business-unit-room-service/services`
  - **Payload**: `BusinessUnitRoomServicesDto`
- `GET /business-unit-room-service/services/:roomId`
  - **Query**: `BaseSearchPaginationDto`
- `GET /business-unit-room-service/:id`
- `DELETE /business-unit-room-service/:id`

---

## Módulo: Service Catalog

### Service (`/service`)

- `POST /service`
  - **Payload**: `CreateServiceDto`
  - **Query**: `SearchServiceDto`
- `GET /service`
  - **Query**: `SearchServiceDto`
- `GET /service/:id`
- `GET /service/code/:code`
  - **Payload**: `UpdateServiceDto`
- `PATCH /service/:id`
  - **Payload**: `UpdateServiceDto`
- `PATCH /service/:id/disable`
- `PATCH /service/:id/enable`
- `DELETE /service/:id`

### Service Business Unit (`/service-business-unit`)

- `POST /service-business-unit`
  - **Payload**: `CreateServiceBusinessUnitDto`
- `GET /service-business-unit/units/:serviceId`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-business-unit/services/:businessUnitId`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-business-unit/:id`
  - **Payload**: `AssociateServicesDto`
- `PATCH /service-business-unit/associate-services`
  - **Payload**: `AssociateServicesDto`
- `PATCH /service-business-unit/associate-units`
  - **Payload**: `AssociateUnitsDto`
- `PATCH /service-business-unit/:id`
  - **Payload**: `UpdateServiceBusinessUnitDto`
- `DELETE /service-business-unit/:id`

### Service Category (`/service-category`)

- `POST /service-category`
  - **Payload**: `CreateServiceCategoryDto`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-category`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-category/:id`
- `GET /service-category/code/:code`
  - **Payload**: `UpdateServiceCategoryDto`
- `PATCH /service-category/:id`
  - **Payload**: `UpdateServiceCategoryDto`
- `DELETE /service-category/:id`

---

## Módulo: Service Order

### Order (`/service-order`)

- `POST /service-order`
  - **Payload**: `CreateServiceOrderDto`
- `GET /service-order`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-order/:id`
- `PATCH /service-order/:id`
  - **Payload**: `UpdateServiceOrderDto`
- `DELETE /service-order/:id`

### Order Details (`/service-order-details`)

- `POST /service-order-details`
  - **Payload**: `CreateServiceOrderDetailDto`
- `GET /service-order-details`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-order-details/:id`
- `PATCH /service-order-details/:id`
  - **Payload**: `UpdateServiceOrderDetailDto`
- `DELETE /service-order-details/:id`

### Order Item (`/service-order-item`)

- `POST /service-order-item`
  - **Payload**: `CreateServiceOrderItemDto`
- `GET /service-order-item/order/:serviceOrderId`
- `GET /service-order-item/:id/order/:serviceOrderId`
- `PATCH /service-order-item/:id/order/:serviceOrderId`
  - **Payload**: `UpdateServiceOrderItemDto`
- `DELETE /service-order-item/:id/order/:serviceOrderId`
- `POST /service-order-item/many`
  - **Payload**: `CreateManyServiceOrderItemsDto`
- `DELETE /service-order-item/all/order/:serviceOrderId`

### Order Resource Consumption (`/order-resource-consumption`)

- `POST /order-resource-consumption`
  - **Payload**: `CreateOrderResourceConsumptionDto`
- `GET /order-resource-consumption/order/:serviceOrderId`
  - **Query**: `BaseSearchPaginationDto`
- `GET /order-resource-consumption/:id/order/:serviceOrderId`
- `PATCH /order-resource-consumption/:id/order/:serviceOrderId`
  - **Payload**: `UpdateOrderResourceConsumptionDto`
- `DELETE /order-resource-consumption/:id/order/:serviceOrderId`

---

## Módulo: Service Provider

### Provider (`/service-provider`)

- `POST /service-provider`
  - **Payload**: `CreateServiceProviderDto`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-provider`
  - **Query**: `BaseSearchPaginationDto`
- `GET /service-provider/:id`
  - **Payload**: `UpdateServiceProviderDto`
- `PATCH /service-provider/:id`
  - **Payload**: `UpdateServiceProviderDto`
- `PATCH /service-provider/:id/disable`
- `PATCH /service-provider/:id/enable`
- `DELETE /service-provider/:id`

### Provider Schedule (`/service-provider-schedule`)

- `PUT /service-provider-schedule`
  - **Payload**: `CreateServiceProviderScheduleDto`
- `GET /service-provider-schedule/:serviceProviderId/unit`
- `DELETE /service-provider-schedule/:serviceProviderId/unit`

### Provider Service (`/service-provider-service`)

- `PUT /service-provider-service`
  - **Payload**: `CreateServiceProviderServiceDto`
- `GET /service-provider-service/:serviceProviderId/unit/:businessUnitId`
  - **Query**: `BaseSearchPaginationDto`
- `DELETE /service-provider-service/:serviceProviderId/unit/:businessUnitId`

---

