import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import {
  CreateServiceOrderDetailDto,
  UpdateServiceOrderDetailDto,
  IOrderDetailSearchResponse,
} from '@shared-common';
import { OrderDetailsHelperService } from './order-details-helper.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: OrderDetailsHelperService,
    private readonly utils: UtilsService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    dto: CreateServiceOrderDetailDto,
    userId?: string,
  ) {
    await this.helper.assertExistsOrder(
      dto.serviceOrderId,
      tenantId,
      businessUnitId,
    );

    const id = uuidv7();

    return await this.prisma.service_order_details.create({
      data: {
        id,
        service_order_id: dto.serviceOrderId,
        symptoms: dto.symptoms,
        diagnosis: dto.diagnosis,
        treatment_plan: dto.treatmentPlan,
        ...(dto.prescription && { prescription: dto.prescription }),
        ...(dto.extraData && { extra_data: dto.extraData }),
        ...(dto.startAt && { start_at: dto.startAt }),
        ...(dto.endAt && { end_at: dto.endAt }),
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
    customerId?: string,
    agentId?: string,
  ): Promise<IOrderDetailSearchResponse> {
    const where = this.helper.applySearchFilters(
      tenantId,
      businessUnitId,
      searchFilters,
      customerId,
      agentId,
    );

    const page = searchFilters.page || 1;
    const limit = searchFilters.limit || 10;
    const skip = this.utils.calculateSkip(page, limit);

    const [total, data] = await this.prisma.$transaction([
      this.prisma.service_order_details.count({ where }),
      this.prisma.service_order_details.findMany({
        where,
        select: {
          id: true,
          service_order_id: true,
          symptoms: true,
          diagnosis: true,
          treatment_plan: true,
          prescription: true,
          extra_data: true,
          start_at: true,
          end_at: true,
          created_at: true,
          created_by: true,
        },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
    ]);

    return this.utils.wrapPaginatedResponse(
      data,
      total,
      page,
      limit,
    ) as IOrderDetailSearchResponse;
  }

  async findOne(tenantId: string, businessUnitId: string, id: string) {
    await this.helper.assertExistsOrderDetail(id, tenantId, businessUnitId);

    return await this.prisma.service_order_details.findFirst({
      where: { id },
    });
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    id: string,
    dto: UpdateServiceOrderDetailDto,
    userId?: string,
  ) {
    await this.helper.assertExistsOrderDetail(id, tenantId, businessUnitId);

    return await this.prisma.service_order_details.update({
      where: { id },
      data: {
        symptoms: dto.symptoms,
        diagnosis: dto.diagnosis,
        treatment_plan: dto.treatmentPlan,
        ...(dto.prescription && { prescription: dto.prescription }),
        ...(dto.extraData && { extra_data: dto.extraData }),
        ...(dto.startAt && { start_at: dto.startAt }),
        ...(dto.endAt && { end_at: dto.endAt }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(
    tenantId: string,
    businessUnitId: string,
    id: string,
    userId?: string,
  ) {
    await this.helper.assertExistsOrderDetail(id, tenantId, businessUnitId);

    return await this.prisma.service_order_details.update({
      where: { id },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
