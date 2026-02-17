import { AccessScope, PermissionType, AppUserRole } from '@enums/index';
import { UtilsService } from '@modules/utils/services/utils.service';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();

const utils = new UtilsService();

export async function accessManagementTypesSeeder() {
  for (const accessScope of Object.values(AccessScope)) {
    const name = utils.toPascalCase(accessScope.replace('_', ' '));

    const itemOrder = Object.values(AccessScope).indexOf(accessScope) + 1;

    await prisma.access_scope.upsert({
      where: { code: accessScope },
      update: {
        name,
        item_order: itemOrder,
        readonly: true,
      },
      create: {
        name,
        code: accessScope,
        item_order: itemOrder,
        readonly: true,
      },
    });
  }

  for (const permissionType of Object.values(PermissionType)) {
    const name = utils.toPascalCase(permissionType.replace('_', ' '));

    const itemOrder = Object.values(PermissionType).indexOf(permissionType) + 1;

    await prisma.permission_type.upsert({
      where: { code: permissionType },
      update: {
        name,
        item_order: itemOrder,
        readonly: true,
      },
      create: {
        name,
        code: permissionType,
        item_order: itemOrder,
        readonly: true,
      },
    });
  }

  for (const roleCode of Object.values(AppUserRole)) {
    const name = utils.toPascalCase(roleCode.replace('_', ' '));

    const itemOrder = Object.values(AppUserRole).indexOf(roleCode) + 1;

    const existRole = await prisma.role.findFirst({
      where: { code: roleCode, readonly: true, removed_at: null },
    });

    if (existRole) {
      await prisma.role.update({
        where: { id: existRole.id },
        data: {
          name,
          item_order: itemOrder,
          readonly: true,
        },
      });
    } else {
      const id = uuidv7();

      await prisma.role.create({
        data: {
          id,
          name,
          code: roleCode,
          readonly: true,
          item_order: itemOrder,
        },
      });
    }
  }

  console.log('✅ Access management types seeded successfully.');
}
