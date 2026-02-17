import { PrismaClient } from '@prisma/client';
import { commonTypesSeeder } from './seeds/common-types.seed';
import { documentEngineTypesSeeder } from './seeds/document-engine/document-engine-types.seed';
import { documentEngineServiceOrderSeeder } from './seeds/document-engine/document-engine-service-order.seed';
import { platformCatalogTypesSeeder } from './seeds/platform-permissions/platform-catalog-types.seed';
import { accessManagementTypesSeeder } from './seeds/platform-permissions/access-management-types.seed';
import { rolePermissionsSeeder } from './seeds/platform-permissions/role-permissions.seed';

const prisma = new PrismaClient();

async function main() {
  await commonTypesSeeder();

  await documentEngineTypesSeeder();

  await documentEngineServiceOrderSeeder();

  await platformCatalogTypesSeeder();

  await accessManagementTypesSeeder();

  await rolePermissionsSeeder();
}

main()
  .catch((e) => {
    console.error('❌ Error in seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
