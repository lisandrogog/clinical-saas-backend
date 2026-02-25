import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { I18nKeys as BusinessUnitDtoI18nKeys } from '@modules/organization/business-unit/constants/i18n.constants';
import { I18nKeys as ServiceDtoI18nKeys } from '@modules/service-catalog/service/constants/i18n.constants';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceBusinessUnitHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async assertBusinessUnitExists(tenantId: string, businessUnitId: string) {
    const unitExists = await this.prisma.business_unit.count({
      where: {
        id: businessUnitId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (unitExists === 0) {
      throw new NotFoundException(BusinessUnitDtoI18nKeys.errors.notFound);
    }
  }

  async assertServiceExists(tenantId: string, serviceId: string) {
    const serviceExists = await this.prisma.service.count({
      where: {
        id: serviceId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (serviceExists === 0) {
      throw new NotFoundException(ServiceDtoI18nKeys.errors.notFound);
    }
  }

  async assertAssociationNotExists(
    tenantId: string,
    businessUnitId: string,
    serviceId: string,
  ) {
    const associationExists = await this.prisma.service_business_unit.count({
      where: {
        service_id: serviceId,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit_id: businessUnitId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (associationExists > 0) {
      throw new BadRequestException(
        I18nKeys.errors.serviceAlreadyAssociatedToUnit,
      );
    }
  }

  async assertAssociationExists(tenantId: string, id: string) {
    const associationExists = await this.prisma.service_business_unit.count({
      where: {
        id,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (associationExists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  applySearchFiltersServices(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Prisma.serviceWhereInput {
    const where: Prisma.serviceWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
      service_business_unit: {
        some: {
          business_unit_id: businessUnitId,
          business_unit: {
            tenant_id: tenantId,
            removed_at: null,
          },
        },
      },
    };

    const search = this.utils.sanitizeSearch(searchFilters.search);

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          code: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return where;
  }

  applySearchFiltersUnits(
    tenantId: string,
    serviceId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Prisma.business_unitWhereInput {
    const where: Prisma.business_unitWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
      service_business_unit: {
        some: {
          service_id: serviceId,
          service: {
            tenant_id: tenantId,
            removed_at: null,
          },
        },
      },
    };

    const search = this.utils.sanitizeSearch(searchFilters.search);

    if (search) {
      where.OR = [
        {
          business_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          code: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return where;
  }
}
