import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { OrderResourceConsumptionHelperService } from './order-resource-consumption-helper.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { UtilsService } from '@modules/utils/services';
import { IOrderResourceConsumptionSearchResponse } from '../interfaces';
import {
  CreateOrderResourceConsumptionDto,
  UpdateOrderResourceConsumptionDto,
} from '../dto';

@Injectable()
export class OrderResourceConsumptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: OrderResourceConsumptionHelperService,
    private readonly utils: UtilsService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    dto: CreateOrderResourceConsumptionDto,
  ) {
    await this.helper.assertExistsOrder(
      tenantId,
      businessUnitId,
      dto.serviceOrderId,
    );

    return await this.prisma.service_order_resource_consumption.create({
      data: {
        service_order_id: dto.serviceOrderId,
        material_resource_id: dto.materialResourceId,
        quantity_used: dto.quantityUsed,
      },
    });
  }

  async findAll(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IOrderResourceConsumptionSearchResponse> {
    const where = this.helper.applySearchFilters(
      tenantId,
      businessUnitId,
      serviceOrderId,
      searchFilters,
    );

    const page = searchFilters.page || 1;
    const limit = searchFilters.limit || 10;
    const skip = this.utils.calculateSkip(page, limit);

    const [total, data] = await this.prisma.$transaction([
      this.prisma.service_order_resource_consumption.count({ where }),
      this.prisma.service_order_resource_consumption.findMany({
        where,
        skip,
        take: limit,
      }),
    ]);

    return this.utils.wrapPaginatedResponse(
      data,
      total,
      page,
      limit,
    ) as IOrderResourceConsumptionSearchResponse;
  }

  async findOne(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    await this.helper.assertExistsOrderResourceConsumption(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_resource_consumption.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
    dto: UpdateOrderResourceConsumptionDto,
  ) {
    await this.helper.assertExistsOrderResourceConsumption(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_resource_consumption.update({
      where: { id },
      data: {
        ...(dto.materialResourceId && {
          material_resource_id: dto.materialResourceId,
        }),
        ...(dto.quantityUsed && { quantity_used: dto.quantityUsed }),
      },
    });
  }

  async remove(
    tenantId: string,
    businessUnitId: string,
    serviceOrderId: string,
    id: string,
  ) {
    await this.helper.assertExistsOrderResourceConsumption(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );

    return await this.prisma.service_order_resource_consumption.delete({
      where: { id },
    });
  }
}
