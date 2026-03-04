import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { BusinessUnitRoomServiceDto } from '../dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BusinessUnitRoomServiceHelperService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
  ) {}

  async assertBusinessUnitRoomExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    id: string,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room.count({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException('Business unit room not found');
    }
  }

  async assertServiceExistsInTenant(
    tenantId: string,
    serviceId: string,
  ): Promise<void> {
    const exists = await this.prisma.service.count({
      where: {
        id: serviceId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException('Service not found');
    }
  }

  async assertExistsAllServicesInTenant(
    tenantId: string,
    serviceIds: string[],
  ): Promise<void> {
    const setServiceIds = new Set(serviceIds);

    if (setServiceIds.size === 0) {
      throw new BadRequestException('Service ids cannot be empty');
    }

    const exists = await this.prisma.service.count({
      where: {
        id: { in: Array.from(setServiceIds) },
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (exists !== setServiceIds.size) {
      throw new NotFoundException('Some services not found');
    }
  }

  async removeAllServicesFromRoom(
    tenantId: string,
    businessUnitId: string,
    businessUnitRoomId: string,
  ) {
    return await this.prisma.business_unit_room_service.deleteMany({
      where: {
        business_unit_room_id: businessUnitRoomId,
        business_unit_room: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
      },
    });
  }

  async assertBusinessUnitRoomServiceExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    businessUnitRoomServiceId: string,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room_service.count({
      where: {
        id: businessUnitRoomServiceId,
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
    });

    if (exists === 0) {
      throw new NotFoundException('Business unit room service not found');
    }
  }

  async assertBusinessUnitRoomServiceNotExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    payload: BusinessUnitRoomServiceDto,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room_service.count({
      where: {
        business_unit_room_id: payload.businessUnitRoomId,
        service_id: payload.serviceId,
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
    });

    if (exists > 0) {
      throw new BadRequestException(
        'Business unit room service already exists',
      );
    }
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId?: string,
    search?: string,
  ): Prisma.business_unit_room_serviceWhereInput {
    const where: Prisma.business_unit_room_serviceWhereInput = {
      business_unit_room: {
        tenant_id: tenantId,
        ...(businessUnitId && { business_unit_id: businessUnitId }),
        removed_at: null,
      },
      service: {
        tenant_id: tenantId,
        removed_at: null,
      },
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utils.sanitizeSearch(search);
      where.OR = [
        {
          business_unit_room: {
            code: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
        {
          business_unit_room: {
            name: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
        {
          service: {
            code: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
        {
          service: {
            name: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    return where;
  }
}
