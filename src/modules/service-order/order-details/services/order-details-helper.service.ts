import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { I18nKeys } from '../constants/i18n.constants';
import { Prisma } from '@prisma/client';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class OrderDetailsHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async assertExistsOrder(
    serviceOrderId: string,
    tenantId: string,
    businessUnitId: string,
    customerId?: string,
    agentId?: string,
  ) {
    const existsOrder = await this.prisma.service_order.count({
      where: {
        id: serviceOrderId,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        ...(customerId && { customer_id: customerId }),
        ...(agentId && { agent_id: agentId }),
        removed_at: null,
      },
    });

    if (existsOrder === 0) {
      throw new NotFoundException(I18nKeys.errors.orderNotFound);
    }
  }

  async assertExistsOrderDetail(
    id: string,
    tenantId: string,
    businessUnitId: string,
  ) {
    const exists = await this.prisma.service_order_details.count({
      where: {
        id,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
    customerId?: string,
    agentId?: string,
  ): Prisma.service_order_detailsWhereInput {
    const where: Prisma.service_order_detailsWhereInput = {
      service_order: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        ...(customerId && { customer_id: customerId }),
        ...(agentId && { agent_id: agentId }),
        removed_at: null,
      },
      removed_at: null,
    };

    if (searchFilters?.search) {
      const search = this.utils.sanitizeSearch(searchFilters.search);
      where.OR = [
        { symptoms: { contains: search, mode: 'insensitive' } },
        { diagnosis: { contains: search, mode: 'insensitive' } },
        { treatment_plan: { contains: search, mode: 'insensitive' } },
      ];
    }

    return where;
  }
}
