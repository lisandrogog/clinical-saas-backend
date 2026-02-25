import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicesBusinessUnitDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { I18nKeys } from '../constants/i18n.constants';
import { UtilsService } from '@modules/utils/services';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProviderServiceHelperService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async assertServiceProviderExists(
    tenantId: string,
    serviceProviderId: string,
  ) {
    const providerExists = await this.prisma.service_provider.count({
      where: {
        id: serviceProviderId,
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (providerExists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  sanitizeGroup(
    servicesByBusinessUnit: CreateServicesBusinessUnitDto[],
  ): CreateServicesBusinessUnitDto[] {
    if (!servicesByBusinessUnit || servicesByBusinessUnit.length === 0) {
      return [];
    }

    const businessUnits = new Set<string>();

    servicesByBusinessUnit.forEach((item) => {
      businessUnits.add(item.businessUnitId);
    });

    const result: CreateServicesBusinessUnitDto[] = [];

    for (const businessUnitId of businessUnits) {
      const services = new Map<string, boolean>();

      servicesByBusinessUnit.forEach((item: CreateServicesBusinessUnitDto) => {
        if (item.businessUnitId === businessUnitId) {
          item.services?.forEach((service) => {
            services.set(service.serviceId, service.active ?? true);
          });
        }
      });

      if (services.size === 0) {
        continue;
      }

      result.push({
        businessUnitId,
        services: Array.from(services.entries()).map(([serviceId, active]) => ({
          serviceId,
          active,
        })),
      });
    }

    return result;
  }

  async assertServicesExists(
    tenantId: string,
    sanitizedServicesByBusinessUnit: CreateServicesBusinessUnitDto[],
  ) {
    for (const item of sanitizedServicesByBusinessUnit) {
      if (item.services && item.services.length > 0) {
        const serviceIds = item.services.map((s) => s.serviceId);

        const existsServices = await this.prisma.service_business_unit.count({
          where: {
            id: { in: serviceIds },
            business_unit_id: item.businessUnitId,
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

        if (existsServices !== serviceIds.length) {
          throw new NotFoundException(I18nKeys.errors.serviceNotFound);
        }
      }
    }
  }

  async removeServicesFromProvider(
    tenantId: string,
    serviceProviderId: string,
  ) {
    await this.prisma.service_provider_service.deleteMany({
      where: {
        tenant_id: tenantId,
        service_provider_id: serviceProviderId,
        service: {
          tenant_id: tenantId,
        },
        business_unit: {
          tenant_id: tenantId,
        },
        service_provider: {
          tenant_id: tenantId,
        },
      },
    });
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId?: string | null,
    search?: string,
  ) {
    const where: Prisma.service_provider_serviceWhereInput = {
      tenant_id: tenantId,
      business_unit_id: businessUnitId,
      ...(serviceProviderId && { service_provider_id: serviceProviderId }),
      service: {
        tenant_id: tenantId,
        removed_at: null,
      },
      business_unit: {
        tenant_id: tenantId,
        removed_at: null,
      },
      service_provider: {
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utilsService.sanitizeSearch(search);
      where.OR = [
        {
          service: {
            code: { contains: sanitizedSearch, mode: 'insensitive' },
            name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          service_provider: {
            business_partner: {
              first_name: { contains: sanitizedSearch, mode: 'insensitive' },
              last_name: { contains: sanitizedSearch, mode: 'insensitive' },
            },
          },
        },
        {
          business_unit: {
            business_name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
      ];
    }

    return where;
  }
}
