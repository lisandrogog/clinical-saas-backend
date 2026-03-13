export const ApplicationModule = {
  ORGANIZATION: 'organization', // identification_type, tenant, business_unit

  RESOURCE_MANAGEMENT: 'resource_management', // material_type, materials, rooms

  ACCESS_MANAGEMENT: 'access_management', // roles, app_user

  PLATFORM_CUSTOMER: 'platform_customer', // customer
  SERVICE_CATALOG: 'service_catalog', // service_category , service, service_business_units
  SERVICE_PROVIDER: 'service_provider', // service_provider, (services), service_provider_schedule
  SERVICE_ORDER: 'service_order', // service_order, service_order_details

  PLATFORM_CATALOG: 'platform_catalog',

  PLATFORM_USERS: 'platform_users',

  DOCUMENT_ENGINE_COMMON: 'document_engine_common',
  DOCUMENT_ENGINE: 'document_engine',

  MONITORING: 'monitoring',
} as const;

export type ApplicationModule =
  (typeof ApplicationModule)[keyof typeof ApplicationModule];
