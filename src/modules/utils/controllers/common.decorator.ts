import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import {
  I18nKeys as TenantI18nKeys,
  DtoI18nKeys as TenantDtoI18nKeys,
} from '@modules/organization/tenant/constants/i18n.constants';

export function ApiCommonDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'tenant-id',
      description: TenantDtoI18nKeys.tenantId,
      required: true,
    }),
    ApiResponse({
      status: 400,
      description: TenantI18nKeys.errors.invalidData,
    }),
    ApiResponse({
      status: 401,
      description: TenantI18nKeys.errors.unauthorized,
    }),
    ApiResponse({
      status: 403,
      description: TenantI18nKeys.errors.forbidden,
    }),
    ApiResponse({
      status: 500,
      description: TenantI18nKeys.errors.internalServerError,
    }),
  );
}
