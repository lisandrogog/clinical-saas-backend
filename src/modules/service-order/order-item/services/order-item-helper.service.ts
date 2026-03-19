import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { I18nKeys } from '../constants/i18n.constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderItemHelperService {
  constructor(private readonly prisma: PrismaService) {}

  async assertExistsOrderItem(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    const exists = await this.prisma.service_order_item.count({
      where: {
        id,
        service_order_id: serviceOrderId,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
      },
    });

    if (exists === 0) {
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
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException('Service order not found');
    }
  }

  async recalculateOrderTotal(
    tx: Prisma.TransactionClient,
    serviceOrderId: string,
  ) {
    const allItems = await tx.service_order_item.findMany({
      where: {
        service_order_id: serviceOrderId,
      },
    });

    const totalAmount = allItems.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0) * Number(item.unit_price || 0),
      0,
    );

    await tx.service_order.update({
      where: {
        id: serviceOrderId,
      },
      data: {
        total_amount: totalAmount,
      },
    });
  }
}
