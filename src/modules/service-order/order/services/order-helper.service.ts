import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { DocumentType } from '@enums/index';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class OrderHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async assertCustomerExists(customerId: string, tenantId: string) {
    const existsCustomer = await this.prisma.business_partner.count({
      where: {
        id: customerId,
        tenant_id: tenantId,
        is_customer: true,
        removed_at: null,
      },
    });

    if (existsCustomer === 0) {
      throw new NotFoundException(
        `Customer with ID ${customerId} does not exist for tenant with ID ${tenantId}`,
      );
    }
  }

  async assertServiceProviderExists(agentId: string, tenantId: string) {
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
      throw new NotFoundException(
        `Service provider with agent-ID ${agentId} does not exist for tenant with ID ${tenantId}`,
      );
    }
  }

  async getDocumentTypeOrFail() {
    const documentType = await this.prisma.document_type.findUnique({
      where: {
        code: DocumentType.SERVICE_ORDER,
      },
    });

    if (!documentType) {
      throw new NotFoundException(
        `Document type with code ${DocumentType.SERVICE_ORDER} does not exist`,
      );
    }

    return documentType;
  }

  async getDocumentEngineOrFail(documentTypeId: number) {
    const documentEngine = await this.prisma.document_engine.findFirst({
      where: {
        document_type_id: documentTypeId,
        is_default: true,
      },
    });

    if (!documentEngine) {
      throw new NotFoundException(
        `Default document engine for document type ${DocumentType.SERVICE_ORDER} does not exist`,
      );
    }

    return documentEngine;
  }

  async getDocumentstatusOrFail(documentStatusCode?: string) {
    if (!documentStatusCode) {
      throw new BadRequestException(`Document status code is required`);
    }

    const documentStatus = await this.prisma.document_status.findUnique({
      where: {
        code: documentStatusCode,
      },
    });

    if (!documentStatus) {
      throw new NotFoundException(
        `Document status with code ${documentStatusCode} does not exist`,
      );
    }

    return documentStatus;
  }

  async assertExistsOrder(
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
      throw new NotFoundException(
        `Service order with ID ${id} does not exist for the given tenant, business unit, customer and agent`,
      );
    }
  }

  applySearchFilters(
    tenantId: string,
    search?: string,
    businessUnitId?: string,
    customerId?: string,
    agentId?: string,
  ) {
    const where: Prisma.service_orderWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
    };

    if (businessUnitId) {
      where.business_unit_id = businessUnitId;
    }

    if (customerId) {
      where.customer_id = customerId;
    }

    if (agentId) {
      where.agent_id = agentId;
    }

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utils.sanitizeSearch(search);

      where.OR = [
        {
          document_number: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
        {
          service_order_item: {
            some: {
              service: {
                name: { contains: sanitizedSearch, mode: 'insensitive' },
              },
            },
          },
        },
        {
          business_partner_service_order_customer_idTobusiness_partner: {
            first_name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          business_partner_service_order_customer_idTobusiness_partner: {
            last_name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          business_partner_service_order_agent_idTobusiness_partner: {
            first_name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          business_partner_service_order_agent_idTobusiness_partner: {
            last_name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
      ];
    }

    return where;
  }
}
