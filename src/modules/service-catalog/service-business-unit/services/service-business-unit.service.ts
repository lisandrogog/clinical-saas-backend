import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateServiceBusinessUnitDto,
  UpdateServiceBusinessUnitDto,
} from '../dto';
import { PrismaService } from '@core/prisma.service';
import { ServiceBusinessUnitHelperService } from './service-business-unit-helper.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';
import { IServiceSearchResponse } from '@modules/service-catalog/service/interfaces/service-search.interface';
import {
  IBusinessUnitSearchResponse,
  ISingleServiceUnitSearch,
} from '../interfaces/business-unit-search.interface';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceBusinessUnitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: ServiceBusinessUnitHelperService,
    private readonly utils: UtilsService,
  ) {}

  async create(
    tenantId: string,
    payload: CreateServiceBusinessUnitDto,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitExists(
      tenantId,
      payload.businessUnitId,
    );

    await this.helper.assertServiceExists(tenantId, payload.serviceId);

    await this.helper.assertAssociationNotExists(
      tenantId,
      payload.businessUnitId,
      payload.serviceId,
    );

    return await this.prisma.service_business_unit.create({
      data: {
        service_id: payload.serviceId,
        business_unit_id: payload.businessUnitId,
        ...(payload.price !== undefined && { price: payload.price }),
        ...(payload.cost !== undefined && { cost: payload.cost }),
        ...(payload.extraData && { extra_data: payload.extraData }),
        created_at: new Date(),
        created_by: userId,
      },
      select: {
        id: true,
      },
    });
  }

  async getServices(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IServiceSearchResponse> {
    await this.helper.assertBusinessUnitExists(tenantId, businessUnitId);

    const where: Prisma.serviceWhereInput =
      this.helper.applySearchFiltersServices(
        tenantId,
        businessUnitId,
        searchFilters,
      );

    const page = searchFilters.page ? searchFilters.page : 1;

    const limit = searchFilters.limit ? searchFilters.limit : 10;

    const skip = this.utils.calculateSkip(page, limit);

    const [total, data] = await Promise.all([
      this.prisma.service.count({ where }),
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          code: true,
          active: true,
          service_category_id: true,
        },
        orderBy: [
          {
            name: 'asc',
          },
        ],
      }),
    ]);

    return this.utils.wrapPaginatedResponse(data, total, page, limit);
  }

  async getUnits(
    tenantId: string,
    serviceId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IBusinessUnitSearchResponse> {
    await this.helper.assertServiceExists(tenantId, serviceId);

    const where: Prisma.business_unitWhereInput =
      this.helper.applySearchFiltersUnits(tenantId, serviceId, searchFilters);

    const page = searchFilters.page ? searchFilters.page : 1;

    const limit = searchFilters.limit ? searchFilters.limit : 10;

    const skip = this.utils.calculateSkip(page, limit);

    const [total, data] = await Promise.all([
      this.prisma.business_unit.count({ where }),
      this.prisma.business_unit.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          business_name: true,
          code: true,
          active: true,
        },
        orderBy: [
          {
            business_name: 'asc',
          },
        ],
      }),
    ]);

    return this.utils.wrapPaginatedResponse(data, total, page, limit);
  }

  async findOne(
    tenantId: string,
    id: string,
  ): Promise<ISingleServiceUnitSearch> {
    const data = await this.prisma.service_business_unit.findFirst({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      select: {
        id: true,
        price: true,
        cost: true,
        service: {
          select: {
            id: true,
            name: true,
            code: true,
            active: true,
            service_category_id: true,
            base_cost: true,
            base_price: true,
          },
        },
        business_unit: {
          select: {
            id: true,
            business_name: true,
            code: true,
            active: true,
          },
        },
      },
    });

    if (!data) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }

    return data;
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdateServiceBusinessUnitDto,
    userId?: string,
  ) {
    await this.helper.assertAssociationExists(tenantId, id);

    return await this.prisma.service_business_unit.update({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      data: {
        ...(payload.price !== undefined && { price: payload.price }),
        ...(payload.cost !== undefined && { cost: payload.cost }),
        ...(payload.active !== undefined && { active: payload.active }),
        ...(payload.extraData && { extra_data: payload.extraData }),
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async delete(tenantId: string, id: string) {
    await this.helper.assertAssociationExists(tenantId, id);

    return await this.prisma.service_business_unit.delete({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }
}
