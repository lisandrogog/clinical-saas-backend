import { Injectable } from '@nestjs/common';
import { CreateServiceProviderServiceDto } from './dto/create-service-provider-service.dto';
import { PrismaService } from '@core/prisma.service';
import { CreateServicesBusinessUnitDto } from './dto/create-services-business-unit.dto';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class ProviderServiceService {
  constructor(private prisma: PrismaService) {}

  async upsert(tenantId: string, dto: CreateServiceProviderServiceDto) {
    await this.assertServiceProviderExists(dto.serviceProviderId, tenantId);

    const sanitizedGroups: CreateServicesBusinessUnitDto[] = this.sanitizeGroup(
      dto.servicesByBusinessUnit || [],
    );

    await this.assertServicesExists(tenantId, sanitizedGroups);

    await this.removeServicesFromProvider(tenantId, dto.serviceProviderId);

    const createData: any[] = [];

    const now = new Date();

    sanitizedGroups.forEach((item) => {
      item.services?.forEach((service) => {
        createData.push({
          id: uuidv7(),
          tenant_id: tenantId,
          business_unit_id: item.businessUnitId,
          service_provider_id: dto.serviceProviderId,
          service_id: service.serviceId,
          active: service.active ?? true,
          created_at: now,
        });
      });
    });

    if (createData.length > 0) {
      await this.prisma.service_provider_service.createMany({
        data: createData,
      });
    }
  }

  async findByUnit(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId: string,
  ) {
    return await this.prisma.service_provider_service.findMany({
      where: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        service_provider_id: serviceProviderId,
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
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        service: {
          code: 'asc',
        },
      },
    });
  }

  async delete(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId: string,
  ) {
    await this.prisma.service_provider_service.deleteMany({
      where: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
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

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertServiceProviderExists(
    serviceProviderId: string,
    tenantId: string,
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
      throw new Error('Service provider does not exist for this tenant');
    }
  }

  private sanitizeGroup(
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
          throw new Error(
            'One or more services do not exist for this tenant or business unit',
          );
        }
      }
    }
  }

  private async removeServicesFromProvider(
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
}
