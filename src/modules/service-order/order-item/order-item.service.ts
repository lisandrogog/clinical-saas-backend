import { Injectable } from '@nestjs/common';
import { CreateServiceOrderItemDto } from './dto/create-service-order-item.dto';
import { UpdateServiceOrderItemDto } from './dto/update-service-order-item.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    createServiceOrderItemDto: CreateServiceOrderItemDto,
  ) {
    const order = await this.prisma.service_order.findFirst({
      where: {
        id: createServiceOrderItemDto.serviceOrderId,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
    });

    if (!order) {
      throw new Error('Service order not found');
    }

    const id = uuidv7();

    return await this.prisma.service_order_item.create({
      data: {
        id,
        service_order_id: createServiceOrderItemDto.serviceOrderId,
        service_id: createServiceOrderItemDto.serviceId,
        quantity: createServiceOrderItemDto.quantity || 1,
        unit_price: createServiceOrderItemDto.unitPrice || 0,
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
    id: string,
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
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
    id: string,
    updateServiceOrderItemDto: UpdateServiceOrderItemDto,
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    await this.assertExistsOrderItem(
      id,
      tenantId,
      businessUnitId,
      serviceOrderId,
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
        service_id: updateServiceOrderItemDto.serviceId,
        quantity: updateServiceOrderItemDto.quantity,
        unit_price: updateServiceOrderItemDto.unitPrice,
      },
    });
  }

  async remove(
    id: string,
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    await this.assertExistsOrderItem(
      id,
      tenantId,
      businessUnitId,
      serviceOrderId,
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

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertExistsOrderItem(
    id: string,
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
  ) {
    const orderItem = await this.prisma.service_order_item.findFirst({
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

    if (!orderItem) {
      throw new Error('Service order item not found');
    }
  }
}
