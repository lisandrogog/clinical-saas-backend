import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { I18nKeys } from '../constants/i18n.constants';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { UtilsService } from '@modules/utils/services';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderResourceConsumptionHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async assertExistsOrderResourceConsumption(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    const exists = await this.prisma.service_order_resource_consumption.count({
      where: {
        id,
        service_order_id: serviceOrderId,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
        },
      },
    });

    if (!exists) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  async assertExistsOrder(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    const exists = await this.prisma.service_order.count({
      where: {
        id: serviceOrderId,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
      },
    });

    if (!exists) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Prisma.service_order_resource_consumptionWhereInput {
    const where: Prisma.service_order_resource_consumptionWhereInput = {
      service_order_id: serviceOrderId,
      service_order: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
      },
    };

    if (searchFilters?.search) {
      const search = this.utils.sanitizeSearch(searchFilters.search);
      where.OR = [
        {
          material_resource: {
            name: { contains: search, mode: 'insensitive' },
            code: { contains: search, mode: 'insensitive' },
          },
        },
        {
          service_order: {
            business_partner_service_order_agent_idTobusiness_partner: {
              first_name: { contains: search, mode: 'insensitive' },
              last_name: { contains: search, mode: 'insensitive' },
            },
          },
        },
        {
          service_order: {
            business_partner_service_order_customer_idTobusiness_partner: {
              first_name: { contains: search, mode: 'insensitive' },
              last_name: { contains: search, mode: 'insensitive' },
            },
          },
        },
      ];
    }

    return where;
  }
}
