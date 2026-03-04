import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessUnitRoomMaterialHelperService } from './business-unit-room-material-helper.service';
import { CreateBusinessUnitRoomMaterialDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { uuidv7 } from 'uuidv7';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import {
  IRoomMaterialSearch,
  IRoomMaterialSearchResponse,
} from '../interfaces/material-resource-search.interface';

@Injectable()
export class BusinessUnitRoomMaterialService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: BusinessUnitRoomMaterialHelperService,
    private readonly utils: UtilsService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    payload: CreateBusinessUnitRoomMaterialDto,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      payload.businessUnitRoomId,
    );

    await this.helper.assertMaterialExistsInTenant(
      tenantId,
      payload.materialId,
    );

    await this.helper.assertBusinessUnitRoomMaterialNotExistsInTenant(
      tenantId,
      businessUnitId,
      payload,
    );

    const id = uuidv7();

    return await this.prisma.business_unit_room_material.create({
      data: {
        id,
        business_unit_room_id: payload.businessUnitRoomId,
        material_resource_id: payload.materialId,
        quantity: payload.quantity || 1,
        created_by: userId,
      },
    });
  }

  async getMaterialsByRoom(
    tenantId: string,
    businessUnitId: string,
    businessUnitRoomId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IRoomMaterialSearchResponse> {
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

    const sanitizedPage = page ? page : 1;
    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_unit_room_material.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const data = await this.prisma.business_unit_room_material.findMany({
      where,
      skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
      take: sanitizedLimit,
      select: {
        id: true,
        quantity: true,
        material_resource: {
          select: {
            id: true,
            name: true,
            code: true,
            item_order: true,
            active: true,
            material_resource_type_id: true,
          },
        },
      },
      orderBy: {
        material_resource: {
          item_order: 'asc',
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
  ): Promise<IRoomMaterialSearch | null> {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    return await this.prisma.business_unit_room_material.findFirst({
      where: {
        id,
        removed_at: null,
        business_unit_room: {
          business_unit: {
            tenant_id: tenantId,
            removed_at: null,
          },
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      select: {
        id: true,
        quantity: true,
        material_resource: {
          select: {
            id: true,
            name: true,
            code: true,
            item_order: true,
            active: true,
            material_resource_type_id: true,
          },
        },
      },
    });
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    id: string,
    payload: CreateBusinessUnitRoomMaterialDto,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    if (
      payload.quantity === undefined ||
      payload.quantity === null ||
      payload.quantity < 0
    ) {
      throw new BadRequestException(
        'La cantidad es requerida y debe ser mayor o igual a cero',
      );
    }

    return await this.prisma.business_unit_room_material.update({
      where: {
        id,
        removed_at: null,
        business_unit_room: {
          business_unit: {
            tenant_id: tenantId,
            removed_at: null,
          },
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      data: {
        quantity: payload.quantity,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async remove(
    tenantId: string,
    businessUnitId: string,
    id: string,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    return await this.prisma.business_unit_room_material.update({
      where: {
        id,
        removed_at: null,
        business_unit_room: {
          business_unit: {
            tenant_id: tenantId,
            removed_at: null,
          },
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
      select: {
        id: true,
        removed_at: true,
      },
    });
  }
}
