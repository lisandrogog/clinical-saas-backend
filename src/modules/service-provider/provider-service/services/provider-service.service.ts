import { Injectable } from '@nestjs/common';
import {
  CreateServiceProviderServiceDto,
  CreateServicesBusinessUnitDto,
} from '../dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { ProviderServiceHelperService } from './provider-service-helper.service';
import { ICreateProviderService } from '../interfaces/create-provider-service.interface';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProviderServiceService {
  constructor(
    private prisma: PrismaService,
    private providerServiceHelperService: ProviderServiceHelperService,
  ) {}

  async upsert(tenantId: string, payload: CreateServiceProviderServiceDto) {
    await this.providerServiceHelperService.assertServiceProviderExists(
      tenantId,
      payload.serviceProviderId,
    );

    const sanitizedGroups: CreateServicesBusinessUnitDto[] =
      this.providerServiceHelperService.sanitizeGroup(
        payload.servicesByBusinessUnit || [],
      );

    await this.providerServiceHelperService.assertServicesExists(
      tenantId,
      sanitizedGroups,
    );

    await this.providerServiceHelperService.removeServicesFromProvider(
      tenantId,
      payload.serviceProviderId,
    );

    const createData: ICreateProviderService[] = [];

    const now = new Date();

    sanitizedGroups.forEach((item) => {
      item.services?.forEach((service) => {
        createData.push({
          id: uuidv7(),
          tenantId: tenantId,
          businessUnitId: item.businessUnitId,
          serviceProviderId: payload.serviceProviderId,
          serviceId: service.serviceId,
          active: service.active ?? true,
        });
      });
    });

    if (createData.length > 0) {
      await this.prisma.service_provider_service.createMany({
        data: createData.map((item) => ({
          id: item.id,
          tenant_id: item.tenantId,
          business_unit_id: item.businessUnitId,
          service_provider_id: item.serviceProviderId,
          service_id: item.serviceId,
          active: item.active ?? true,
          created_at: now,
        })),
        skipDuplicates: true,
      });
    }
  }

  async findByUnit(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
    serviceProviderId?: string | null,
  ) {
    const { search, page, limit } = searchFilters;

    const where: Prisma.service_provider_serviceWhereInput =
      this.providerServiceHelperService.applySearchFilters(
        tenantId,
        businessUnitId,
        serviceProviderId,
        search,
      );

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.service_provider_service.count({
      where,
    });

    const lastPage = Math.ceil(total / sanitizedLimit);

    const data = await this.prisma.service_provider_service.findMany({
      where,
      skip: (sanitizedPage - 1) * sanitizedLimit,
      take: sanitizedLimit,
      include: {
        service: true,
      },
      orderBy: {
        service: {
          code: 'asc',
        },
      },
    });

    return {
      data,
      meta: {
        total,
        page: sanitizedPage,
        lastPage,
      },
    };
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
}
