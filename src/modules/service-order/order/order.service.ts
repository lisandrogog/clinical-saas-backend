import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { DocumentType } from '@enums/index';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    dto: CreateServiceOrderDto,
    userId?: string,
  ) {
    await this.assertCustomerExists(dto.customerId, tenantId);

    await this.assertServiceProviderExists(dto.agentId, tenantId);

    const documentType = await this.getDocumentTypeOrFail();

    const documentEngine = await this.getDocumentEngineOrFail(documentType.id);

    const id = uuidv7();

    return await this.prisma.service_order.create({
      data: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        customer_id: dto.customerId,
        agent_id: dto.agentId,
        scheduled_at: dto.scheduledAt,
        total_amount: dto.totalAmount || 0,
        document_type_id: documentType?.id,
        document_status_id: documentEngine.initial_state_id,
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
    return await this.prisma.service_order.findMany({
      where: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        customer_id: customerId,
        agent_id: agentId,
        removed_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string, tenantId: string, businessUnitId: string) {
    return await this.prisma.service_order.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
    });
  }

  async update(
    id: string,
    tenantId: string,
    businessUnitId: string,
    dto: UpdateServiceOrderDto,
    userId?: string,
  ) {
    const documentStatus = await this.getDocumentstatusOrFail(
      dto.documentStatusCode,
    );

    await this.assertExistsOrder(
      id,
      tenantId,
      businessUnitId,
      dto.customerId,
      dto.agentId,
    );

    return await this.prisma.service_order.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
      },
      data: {
        scheduled_at: dto.scheduledAt,
        total_amount: dto.totalAmount,
        ...(documentStatus && { document_status_id: documentStatus.id }),
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
    await this.assertExistsOrder(id, tenantId, businessUnitId);

    return await this.prisma.service_order.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
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

  private async assertCustomerExists(customerId: string, tenantId: string) {
    const existsCustomer = await this.prisma.business_partner.count({
      where: {
        id: customerId,
        tenant_id: tenantId,
        is_customer: true,
        removed_at: null,
      },
    });
    if (existsCustomer === 0) {
      throw new Error(
        `Customer with ID ${customerId} does not exist for tenant with ID ${tenantId}`,
      );
    }
  }

  private async assertServiceProviderExists(agentId: string, tenantId: string) {
    const existsProvider = await this.prisma.service_provider.count({
      where: {
        tenant_id: tenantId,
        business_partner_id: agentId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (existsProvider === 0) {
      throw new Error(
        `Service provider with agent-ID ${agentId} does not exist for tenant with ID ${tenantId}`,
      );
    }
  }

  private async getDocumentTypeOrFail() {
    const documentType = await this.prisma.document_type.findUnique({
      where: {
        code: DocumentType.SERVICE_ORDER,
      },
    });

    if (!documentType) {
      throw new Error(
        `Document type with code ${DocumentType.SERVICE_ORDER} does not exist`,
      );
    }

    return documentType;
  }

  private async getDocumentEngineOrFail(documentTypeId: number) {
    const documentEngine = await this.prisma.document_engine.findFirst({
      where: {
        document_type_id: documentTypeId,
        is_default: true,
      },
    });

    if (!documentEngine) {
      throw new Error(
        `Default document engine for document type ${DocumentType.SERVICE_ORDER} does not exist`,
      );
    }

    return documentEngine;
  }

  private async getDocumentstatusOrFail(documentStatusCode?: string) {
    if (!documentStatusCode) {
      return null;
    }

    const documentStatus = await this.prisma.document_status.findUnique({
      where: {
        code: documentStatusCode,
      },
    });

    if (!documentStatus) {
      throw new Error(
        `Document status with code ${documentStatusCode} does not exist`,
      );
    }

    return documentStatus;
  }

  private async assertExistsOrder(
    id: string,
    tenantId: string,
    businessUnitId: string,
    customerId?: string,
    agentId?: string,
  ) {
    const existsOrder = await this.prisma.service_order.count({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        customer_id: customerId,
        agent_id: agentId,
        removed_at: null,
      },
    });

    if (existsOrder === 0) {
      throw new Error(
        `Service order with ID ${id} does not exist for the given tenant, business unit, customer and agent`,
      );
    }
  }
}
