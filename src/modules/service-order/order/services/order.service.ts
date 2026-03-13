import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDto, UpdateServiceOrderDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { OrderHelperService } from './order-helper.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { document_status, Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';
import {
  IOrderSearch,
  IOrderSearchResponse,
  ISingleOrderItemSearch,
  ISingleOrderSearch,
  ISingleOrderWrapper,
} from '../interfaces/service-order-search.interface';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: OrderHelperService,
    private readonly utils: UtilsService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    payload: CreateServiceOrderDto,
    userId?: string,
  ) {
    await this.helper.assertCustomerExists(payload.customerId, tenantId);

    await this.helper.assertServiceProviderExists(payload.agentId, tenantId);

    const documentType = await this.helper.getDocumentTypeOrFail();

    const documentEngine = await this.helper.getDocumentEngineOrFail(
      documentType.id,
    );

    const id = uuidv7();

    return await this.prisma.service_order.create({
      data: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        customer_id: payload.customerId,
        agent_id: payload.agentId,
        document_number: id, // TODO: Implement document number generation
        scheduled_at: payload.scheduledAt,
        total_amount: payload.totalAmount || 0,
        document_type_id: documentType?.id,
        document_status_id: documentEngine.initial_state_id,
        created_at: new Date(),
        created_by: userId,
      },
      select: {
        id: true,
        created_at: true,
      },
    });
  }

  async findAll(
    tenantId: string,
    searchFilters: BaseSearchPaginationDto,
    businessUnitId?: string,
    customerId?: string,
    agentId?: string,
  ): Promise<IOrderSearchResponse> {
    const { search, page, limit } = searchFilters;

    const where: Prisma.service_orderWhereInput =
      this.helper.applySearchFilters(
        tenantId,
        search,
        businessUnitId,
        customerId,
        agentId,
      );

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const skip = this.utils.calculateSkip(sanitizedPage, sanitizedLimit);

    const take = sanitizedLimit;

    const total = await this.prisma.service_order.count({ where });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const orders: IOrderSearch[] = await this.prisma.service_order.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        document_number: true,
        scheduled_at: true,
        total_amount: true,
        document_status_id: true,
        created_at: true,
        created_by: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      data: orders,
      meta: {
        total,
        page: sanitizedPage,
        lastPage,
      },
    };
  }

  async findOne(
    tenantId: string,
    businessUnitId: string,
    id: string,
  ): Promise<ISingleOrderWrapper> {
    await this.helper.assertExistsOrder(id, tenantId, businessUnitId);

    const order = await this.prisma.service_order.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      select: {
        id: true,
        document_number: true,
        business_partner_service_order_customer_idTobusiness_partner: {
          select: {
            identification_type_id: true,
            identification_number: true,
            first_name: true,
            last_name: true,
          },
        },
        business_partner_service_order_agent_idTobusiness_partner: {
          select: {
            identification_type_id: true,
            identification_number: true,
            first_name: true,
            last_name: true,
          },
        },
        scheduled_at: true,
        total_amount: true,
        document_status_id: true,
        business_unit_room: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        created_at: true,
        created_by: true,
      },
    });

    let serviceOrder: ISingleOrderSearch | null = null;

    if (order) {
      serviceOrder = {
        id: order.id,
        scheduled_at: order.scheduled_at,
        total_amount: order.total_amount,
        document_status_id: order.document_status_id,
        created_at: order.created_at,
        created_by: order.created_by,
        document_number: order.document_number,
      };

      if (order.business_partner_service_order_customer_idTobusiness_partner) {
        serviceOrder.customer =
          order.business_partner_service_order_customer_idTobusiness_partner;
      }

      if (order.business_partner_service_order_agent_idTobusiness_partner) {
        serviceOrder.service_provider =
          order.business_partner_service_order_agent_idTobusiness_partner;
      }

      if (order.business_unit_room) {
        serviceOrder.business_unit_room = order.business_unit_room;
      }
    }

    const items: ISingleOrderItemSearch[] =
      await this.prisma.service_order_item.findMany({
        where: {
          service_order_id: id,
        },
        select: {
          id: true,
          service: {
            select: {
              id: true,
              code: true,
              name: true,
              base_price: true,
            },
          },
          quantity: true,
          unit_price: true,
        },
      });

    return {
      order: serviceOrder,
      items,
    } as ISingleOrderWrapper;
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    id: string,
    dto: UpdateServiceOrderDto,
    userId?: string,
  ) {
    let documentStatus: document_status | null = null;

    if (dto.documentStatusCode) {
      documentStatus = await this.helper.getDocumentstatusOrFail(
        dto.documentStatusCode,
      );
    }

    await this.helper.assertExistsOrder(
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
        removed_at: null,
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
    tenantId: string,
    businessUnitId: string,
    id: string,
    userId?: string,
  ) {
    await this.helper.assertExistsOrder(id, tenantId, businessUnitId);

    return await this.prisma.service_order.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
