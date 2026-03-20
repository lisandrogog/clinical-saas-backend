import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { uuidv7 } from 'uuidv7';
import {
  CreateServiceOrderItemDto,
  UpdateServiceOrderItemDto,
  CreateManyServiceOrderItemsDto,
} from '@shared-common';
import { OrderItemHelperService } from './order-item-helper.service';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: OrderItemHelperService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    payload: CreateServiceOrderItemDto,
  ) {
    await this.helper.assertExistsOrder(
      tenantId,
      businessUnitId,
      payload.serviceOrderId,
    );

    const id = uuidv7();

    return await this.prisma.service_order_item.create({
      data: {
        id,
        service_order_id: payload.serviceOrderId,
        service_id: payload.serviceId,
        quantity: payload.quantity || 1,
        unit_price: payload.unitPrice || 0,
      },
    });
  }

  async findAll(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    return await this.prisma.service_order_item.findMany({
      where: {
        service_order_id: serviceOrderId,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    await this.helper.assertExistsOrderItem(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_item.findFirst({
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
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
    payload: UpdateServiceOrderItemDto,
  ) {
    await this.helper.assertExistsOrderItem(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_item.update({
      where: {
        id,
        service_order_id: serviceOrderId,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
      },
      data: {
        service_id: payload.serviceId,
        quantity: payload.quantity,
        unit_price: payload.unitPrice,
      },
    });
  }

  async remove(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    await this.helper.assertExistsOrderItem(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_item.delete({
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
  }

  async createMany(
    tenantId: string,
    businessUnitId: string,
    payload: CreateManyServiceOrderItemsDto,
  ) {
    if (!payload.serviceOrderId || !payload.items.length) {
      return { count: 0 };
    }

    const serviceOrderId = payload.serviceOrderId;

    await this.helper.assertExistsOrder(
      tenantId,
      businessUnitId,
      serviceOrderId,
    );

    const itemsToCreate = payload.items.map((item) => ({
      id: uuidv7(),
      service_order_id: payload.serviceOrderId,
      service_id: item.serviceId,
      quantity: item.quantity || 1,
      unit_price: item.unitPrice || 0,
    }));

    return await this.prisma.$transaction(async (tx) => {
      const createdItems = await tx.service_order_item.createMany({
        data: itemsToCreate,
      });

      await this.helper.recalculateOrderTotal(
        tx as Prisma.TransactionClient,
        serviceOrderId,
      );

      return createdItems;
    });
  }

  async removeAll(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    await this.helper.assertExistsOrder(
      tenantId,
      businessUnitId,
      serviceOrderId,
    );

    await this.prisma.$transaction(async (tx) => {
      await tx.service_order_item.deleteMany({
        where: {
          service_order_id: serviceOrderId,
          service_order: {
            tenant_id: tenantId,
            business_unit_id: businessUnitId,
            removed_at: null,
          },
        },
      });

      await this.helper.recalculateOrderTotal(
        tx as Prisma.TransactionClient,
        serviceOrderId,
      );
    });
  }
}
