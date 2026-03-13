import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDetailDto } from './dto/create-service-order-detail.dto';
import { UpdateServiceOrderDetailDto } from './dto/update-service-order-detail.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class OrderDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    dto: CreateServiceOrderDetailDto,
    userId?: string,
  ) {
    await this.assertExistsOrder(dto.serviceOrderId, tenantId, businessUnitId);

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
    businessUnitId?: string,
    customerId?: string,
    agentId?: string,
  ) {
    return await this.prisma.service_order_details.findMany({
      where: {
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          customer_id: customerId,
          agent_id: agentId,
          removed_at: null,
        },
        removed_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string, tenantId: string, businessUnitId: string) {
    return await this.prisma.service_order_details.findFirst({
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
  }

  async update(
    id: string,
    tenantId: string,
    businessUnitId: string,
    dto: UpdateServiceOrderDetailDto,
    userId?: string,
  ) {
    return await this.prisma.service_order_details.update({
      where: {
        id,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        removed_at: null,
      },
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
    id: string,
    tenantId: string,
    businessUnitId: string,
    userId?: string,
  ) {
    return await this.prisma.service_order_details.update({
      where: {
        id,
        service_order: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        removed_at: null,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertExistsOrder(
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
        customer_id: customerId,
        agent_id: agentId,
        removed_at: null,
      },
    });

    if (existsOrder === 0) {
      throw new Error(
        `Service order with ID ${serviceOrderId} does not exist for the given tenant, business unit, customer and agent`,
      );
    }
  }
}
