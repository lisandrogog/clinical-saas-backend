import { AppUserRolePermissions } from '@constants/index';
import { Platform } from '@enums/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRolePermission {
  roleId: string;
  moduleId: number;
  subModuleId: number;
  accessScopeId: number;
  permissionTypeId: number;
  itemOrder: number;
}

export async function rolePermissionsSeeder() {
  const existPlatform = await prisma.platform.findUnique({
    where: { code: Platform.CORE_HEALTHCARE },
  });

  if (!existPlatform) {
    throw new Error(
      `Platform with code ${Platform.CORE_HEALTHCARE} not found. Please run the platform seeder first.`,
    );
  }

  for (const role of Object.values(AppUserRolePermissions)) {
    const existRole = await prisma.role.findFirst({
      where: { code: role.role, readonly: true, removed_at: null },
    });

    if (!existRole) {
      throw new Error(
        `Role with code ${role.role} not found. Please run the role seeder first.`,
      );
    }

    const rolePermissions: IRolePermission[] = [];

    for (const appModule of role.modules) {
      const existModule = await prisma.app_module.findUnique({
        where: {
          platform_id_code: {
            platform_id: existPlatform.id,
            code: appModule.module,
          },
          readonly: true,
        },
      });

      if (!existModule) {
        throw new Error(
          `Module with code ${appModule.module} not found. Please run the module seeder first.`,
        );
      }

      for (const appSubModule of appModule.subModules) {
        const { subModule, accessScope, permissionType } = appSubModule;

        const existSubModule = await prisma.app_sub_module.findUnique({
          where: {
            app_module_id_code: {
              app_module_id: existModule.id,
              code: subModule,
            },
            readonly: true,
          },
        });

        const existAccessScope = await prisma.access_scope.findUnique({
          where: {
            code: accessScope,
            readonly: true,
          },
        });

        const existPermissionType = await prisma.permission_type.findUnique({
          where: {
            code: permissionType,
            readonly: true,
          },
        });

        if (!existSubModule || !existAccessScope || !existPermissionType) {
          throw new Error(
            `Submodule, access scope, or permission type not found. Please run the respective seeders first.`,
          );
        }

        rolePermissions.push({
          roleId: existRole.id,
          moduleId: existModule.id,
          subModuleId: existSubModule.id,
          accessScopeId: existAccessScope.id,
          permissionTypeId: existPermissionType.id,
          itemOrder: rolePermissions.length + 1,
        });
      }
    }

    await prisma.permission.deleteMany({
      where: {
        role_id: existRole.id,
        readonly: true,
      },
    });

    await prisma.permission.createMany({
      data: rolePermissions.map((permission) => ({
        role_id: permission.roleId,
        app_sub_module_id: permission.subModuleId,
        access_scope_id: permission.accessScopeId,
        permission_type_id: permission.permissionTypeId,
        item_order: permission.itemOrder,
        readonly: true,
      })),
      skipDuplicates: true,
    });
  }
}
