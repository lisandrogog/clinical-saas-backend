import { ApplicationModule } from '@enums/index';
import { IAppModule } from './app-module.interface';
import { IAppSubModule } from './app-sub-module.interface';

/**
 * This file centralizes the definition of sub-modules for each application module in the platform catalog.
 *
 * By defining the sub-modules here, we can ensure that they are consistently referenced throughout the application,
 * especially in places like seeders where we need to populate the database with these values.
 */
export const ApplicationSubModules: IAppModule[] = [
  {
    code: ApplicationModule.ORGANIZATION,
    name: 'Organización',
    itemOrder: 1,
    subModules: [
      {
        name: 'Tipos de Identificación',
        code: 'identification_type',
        itemOrder: 1,
      },
      { name: 'Tenants', code: 'tenant', itemOrder: 2 },
      { name: 'Unidades Operativas', code: 'business_unit', itemOrder: 3 },
      { name: 'Socios de Negocios', code: 'business_partner', itemOrder: 4 }, // + business_partner_business_unit
      // { name: 'Industry', code: 'industry', itemOrder: 5 }, // readonly
    ] as IAppSubModule[],
  } as IAppModule,
  {
    code: ApplicationModule.ACCESS_MANAGEMENT,
    name: 'Roles & Permisos',
    itemOrder: 2,
    subModules: [
      { name: 'Roles & Permisos', code: 'role', itemOrder: 1 }, // permission
    ] as IAppSubModule[],
  } as IAppModule,
  {
    code: ApplicationModule.PLATFORM_USERS,
    name: 'Usuarios de la Plataforma',
    itemOrder: 3,
    subModules: [
      { name: 'Usuarios de la Plataforma', code: 'app_user', itemOrder: 1 }, // + app_user_business_unit
      {
        name: 'Estados de Usuario de la Plataforma',
        code: 'app_user_status',
        itemOrder: 2,
      },
    ] as IAppSubModule[],
  } as IAppModule,
  {
    code: ApplicationModule.SERVICE_CATALOG,
    name: 'Catálogo de Servicios',
    itemOrder: 4,
    subModules: [
      {
        name: 'Categoría de Servicios',
        code: 'service_category',
        itemOrder: 1,
      },
      { name: 'Servicios', code: 'service', itemOrder: 2 },
      {
        name: 'Servicios en Unidades Operativas',
        code: 'service_business_unit',
        itemOrder: 3,
      },
    ] as IAppSubModule[],
  } as IAppModule,
  {
    code: ApplicationModule.SERVICE_PROVIDER,
    name: 'Especialistas',
    itemOrder: 5,
    subModules: [
      {
        name: 'Especialistas',
        code: 'service_provider', // + service_provider_services (+ business_unit)
        itemOrder: 1,
      },
      {
        name: 'Disponibilidad Horaria de Especialistas',
        code: 'service_provider_schedule',
        itemOrder: 2,
      },
    ] as IAppSubModule[],
  } as IAppModule,
  {
    code: ApplicationModule.SERVICE_ORDER,
    name: 'Citas Médicas',
    itemOrder: 6,
    subModules: [
      {
        name: 'Citas Médicas',
        code: 'service_order', // + servicer_oder_item (+ business_unit) + service_order_details
        itemOrder: 1,
      },
      {
        name: 'Consultas Médicas',
        code: 'service_order_details',
        itemOrder: 2,
      },
    ] as IAppSubModule[],
  } as IAppModule,
];
