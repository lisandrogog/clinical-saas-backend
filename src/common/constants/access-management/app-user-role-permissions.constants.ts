import { AccessScope, AppUserRole, PermissionType } from '@enums/index';
import { IPermissionRole } from './permission-role.interface';
import { ApplicationSubModules } from '@constants/platform-catalog/app-sub-module.constants';

export const AppUserRolePermissions: IPermissionRole[] = [
  {
    role: AppUserRole.SUPER_ADMIN,
    modules: ApplicationSubModules.map((appModule) => ({
      module: appModule.code,
      subModules: appModule.subModules.map((appSubModule) => ({
        subModule: appSubModule.code,
        accessScope: AccessScope.ALL_RECORDS,
        permissionType: PermissionType.ADMIN_ACCESS,
      })),
    })),
  },
  {
    role: AppUserRole.TENANT_ADMIN,
    modules: ApplicationSubModules.map((appModule) => ({
      module: appModule.code,
      subModules: appModule.subModules.map((appSubModule) => {
        if (appSubModule.code === 'tenant') {
          return {
            subModule: appSubModule.code,
            accessScope: AccessScope.TENANT_RECORDS,
            permissionType: PermissionType.FULL_ACCESS,
          };
        }
        return {
          subModule: appSubModule.code,
          accessScope: AccessScope.TENANT_RECORDS,
          permissionType: PermissionType.ADMIN_ACCESS,
        };
      }),
    })),
  },
  {
    role: AppUserRole.UNIT_ADMIN,
    modules: ApplicationSubModules.map((appModule) => ({
      module: appModule.code,
      subModules: appModule.subModules
        .map((appSubModule) => {
          if (
            appSubModule.code === 'role' ||
            appSubModule.code === 'app_user_status'
          ) {
            return {
              subModule: appSubModule.code,
              accessScope: AccessScope.UNIT_RECORDS,
              permissionType: PermissionType.READ_ONLY,
            };
          }
          if (
            appSubModule.code === 'app_user' ||
            appSubModule.code === 'business_unit'
          ) {
            return {
              subModule: appSubModule.code,
              accessScope: AccessScope.UNIT_RECORDS,
              permissionType: PermissionType.FULL_ACCESS,
            };
          }
          return {
            subModule: appSubModule.code,
            accessScope: AccessScope.UNIT_RECORDS,
            permissionType: PermissionType.ADMIN_ACCESS,
          };
        })
        .filter((subModule) => subModule.subModule !== 'tenant'), // Unit Admin should not have access to tenant management
    })),
  },
  {
    role: AppUserRole.UNIT_OPERATOR,
    modules: ApplicationSubModules.map((appModule) => ({
      module: appModule.code,
      subModules: appModule.subModules
        .map((appSubModule) => {
          if (
            appSubModule.code === 'role' ||
            appSubModule.code === 'app_user_status' ||
            appSubModule.code === 'business_unit'
          ) {
            return {
              subModule: appSubModule.code,
              accessScope: AccessScope.UNIT_RECORDS,
              permissionType: PermissionType.READ_ONLY,
            };
          }
          if (appSubModule.code === 'app_user') {
            return {
              subModule: appSubModule.code,
              accessScope: AccessScope.OWN_RECORDS,
              permissionType: PermissionType.FULL_ACCESS,
            };
          }
          return {
            subModule: appSubModule.code,
            accessScope: AccessScope.UNIT_RECORDS,
            permissionType: PermissionType.FULL_ACCESS,
          };
        })
        .filter(
          (subModule) =>
            subModule.subModule !== 'tenant' && subModule.subModule !== 'role',
        ), // Unit Operator should not have access to tenant management neither role visibility
    })),
  },
];
