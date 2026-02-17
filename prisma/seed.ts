import { commonTypesSeeder } from './seeds/common-types.seed';
import { documentEngineTypesSeeder } from './seeds/document-engine/document-engine-types.seed';
import { documentEngineServiceOrderSeeder } from './seeds/document-engine/document-engine-service-order.seed';
import { platformCatalogTypesSeeder } from './seeds/platform-permissions/platform-catalog-types.seed';
import { accessManagementTypesSeeder } from './seeds/platform-permissions/access-management-types.seed';
import { rolePermissionsSeeder } from './seeds/platform-permissions/role-permissions.seed';
import { systemSeeder } from './seeds/tenants/system-tenant.seed';
import {
  demoHealthcareTenantSeeder,
  demoHealthcareUsersSeeder,
  demoHealthcareServicesSeeder,
  demoHealthcarePartnersSeeder,
  demoHealthcareProviderScheduleSeeder,
} from './seeds/tenants/demo-healthcare-tenant/index';

async function main() {
  await commonTypesSeeder();

  await documentEngineTypesSeeder();

  await documentEngineServiceOrderSeeder();

  await platformCatalogTypesSeeder();

  await accessManagementTypesSeeder();

  await rolePermissionsSeeder();

  await systemSeeder();

  await demoHealthcareTenantSeeder();

  await demoHealthcareUsersSeeder();

  await demoHealthcareServicesSeeder();

  await demoHealthcarePartnersSeeder();

  await demoHealthcareProviderScheduleSeeder();

  console.log('✅ All seeders executed successfully.');
}

main().catch((e) => {
  console.error('❌ Error in seeder:', e);
  process.exit(1);
});
