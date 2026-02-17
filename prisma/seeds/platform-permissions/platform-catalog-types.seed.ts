import { Platform } from '@enums/index';
import { ApplicationSubModules } from '@constants/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function platformCatalogTypesSeeder() {
  const platform = await prisma.platform.upsert({
    where: { code: Platform.CORE_HEALTHCARE },
    update: {
      name: 'Healthcare Platform',
      readonly: true,
    },
    create: {
      name: 'Healthcare Platform',
      code: Platform.CORE_HEALTHCARE,
      readonly: true,
    },
  });

  console.log('✅ Platform seeded successfully.');

  for (const module of ApplicationSubModules) {
    const applicationModule = await prisma.app_module.upsert({
      where: {
        platform_id_code: {
          platform_id: platform.id,
          code: module.code,
        },
      },
      create: {
        platform_id: platform.id,
        name: module.name,
        code: module.code,
        item_order: module.itemOrder,
        readonly: true,
      },
      update: {
        name: module.name,
        item_order: module.itemOrder,
        readonly: true,
      },
    });

    const subModules = module.subModules;

    for (const subModule of subModules) {
      await prisma.app_sub_module.upsert({
        where: {
          app_module_id_code: {
            app_module_id: applicationModule.id,
            code: subModule.code,
          },
        },
        create: {
          app_module_id: applicationModule.id,
          name: subModule.name,
          code: subModule.code,
          item_order: subModule.itemOrder,
          readonly: true,
        },
        update: {
          name: subModule.name,
          item_order: subModule.itemOrder,
          readonly: true,
        },
      });
    }
  }

  console.log('✅ Platform modules and submodules seeded successfully.');
}
