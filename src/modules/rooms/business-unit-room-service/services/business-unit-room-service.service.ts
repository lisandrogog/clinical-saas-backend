import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessUnitRoomServiceHelperService } from './business-unit-room-service-helper.service';
import {
  BusinessUnitRoomServiceDto,
  BusinessUnitRoomServicesDto,
} from '../dto';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { uuidv7 } from 'uuidv7';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import {
  IRoomServiceSearch,
  IRoomServiceSearchResponse,
} from '../interfaces/room-service-search.interface';

@Injectable()
export class BusinessUnitRoomServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: BusinessUnitRoomServiceHelperService,
    private readonly utils: UtilsService,
  ) {}

  async createOne(
    tenantId: string,
    businessUnitId: string,
    payload: BusinessUnitRoomServiceDto,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      payload.businessUnitRoomId,
    );

    await this.helper.assertServiceExistsInTenant(tenantId, payload.serviceId);

    await this.helper.assertBusinessUnitRoomServiceNotExistsInTenant(
      tenantId,
      businessUnitId,
      payload,
    );

    const id = uuidv7();

    return await this.prisma.business_unit_room_service.create({
      data: {
        id,
        business_unit_room_id: payload.businessUnitRoomId,
        service_id: payload.serviceId,
      },
    });
  }

  async createMany(
    tenantId: string,
    businessUnitId: string,
    payload: BusinessUnitRoomServicesDto,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      payload.businessUnitRoomId,
    );

    await this.helper.assertExistsAllServicesInTenant(
      tenantId,
      payload.serviceIds || [],
    );

    await this.helper.removeAllServicesFromRoom(
      tenantId,
      businessUnitId,
      payload.businessUnitRoomId,
    );

    const insertPayload = payload.serviceIds.map((serviceId) => ({
      id: uuidv7(),
      business_unit_room_id: payload.businessUnitRoomId,
      service_id: serviceId,
    }));

    return await this.prisma.business_unit_room_service.createMany({
      data: insertPayload,
    });
  }

  async getServicesByRoom(
    tenantId: string,
    businessUnitId: string,
    businessUnitRoomId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IRoomServiceSearchResponse> {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      businessUnitRoomId,
    );

    const { page, limit, search } = searchFilters;

    const where = this.helper.applySearchFilters(
      tenantId,
      businessUnitId,
      search,
    );

    where.business_unit_room_id = businessUnitRoomId;

    const sanitizedPage = page ? page : 1;
    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_unit_room_service.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const data = await this.prisma.business_unit_room_service.findMany({
      where,
      skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
      take: sanitizedLimit,
      select: {
        id: true,
        service: {
          select: {
            id: true,
            name: true,
            code: true,
            active: true,
            service_category_id: true,
          },
        },
      },
      orderBy: {
        service: {
          name: 'asc',
        },
      },
    });

    return {
      data,
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
  ): Promise<IRoomServiceSearch | null> {
    await this.helper.assertBusinessUnitRoomServiceExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    const record = await this.prisma.business_unit_room_service.findFirst({
      where: {
        id,
        business_unit_room: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      select: {
        id: true,
        service: {
          select: {
            id: true,
            name: true,
            code: true,
            active: true,
            service_category_id: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException('Business unit room service not found');
    }

    return record;
  }

  async remove(tenantId: string, businessUnitId: string, id: string) {
    await this.helper.assertBusinessUnitRoomServiceExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    return await this.prisma.business_unit_room_service.delete({
      where: { id },
      select: { id: true },
    });
  }
}
