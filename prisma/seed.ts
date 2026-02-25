import { commonTypesSeeder } from './seeds';
import {
  documentEngineTypesSeeder,
  documentEngineServiceOrderSeeder,
} from './seeds/document-engine';
import {
  platformCatalogTypesSeeder,
  accessManagementTypesSeeder,
  rolePermissionsSeeder,
} from './seeds/platform-permissions';
import {
  systemSeeder,
  demoHealthcareTenantSeeder,
  demoHealthcareUsersSeeder,
  demoHealthcareServicesSeeder,
  demoHealthcarePartnersSeeder,
  demoHealthcareProviderScheduleSeeder,
  demoHealthcareServiceOrdersSeeder,
} from './seeds/tenants';

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

  await demoHealthcareServiceOrdersSeeder();

  console.log('✅ All seeders executed successfully.');
}

main().catch((e) => {
  console.error('❌ Error in seeder:', e);
  process.exit(1);
});
