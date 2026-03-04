import { Injectable } from '@nestjs/common';
import { CreateBusinessUnitRoomDto, UpdateBusinessUnitRoomDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { BusinessUnitRoomHelperService } from './business-unit-room-helper.service';
import { uuidv7 } from 'uuidv7';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';
import {
  IBusinessUnitRoomSearch,
  IBusinessUnitRoomSearchResponse,
} from '../interfaces/business-unit-room-search.interface';

@Injectable()
export class BusinessUnitRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
    private readonly helper: BusinessUnitRoomHelperService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    payload: CreateBusinessUnitRoomDto,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitExistsInTenant(
      tenantId,
      businessUnitId,
    );

    await this.helper.assertCodeNotExistsInTenant(tenantId, payload.code);

    const id = uuidv7();

    return await this.prisma.business_unit_room.create({
      data: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder || 0,
        capacity: payload.capacity || 1,
        extra_data: payload.extraData || {},
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
  ): Promise<IBusinessUnitRoomSearchResponse> {
    const { search, page, limit } = searchFilters;

    const where: Prisma.business_unit_roomWhereInput =
      this.helper.applySearchFilters(tenantId, businessUnitId, search);

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_unit_room.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const businessUnitRooms: IBusinessUnitRoomSearch[] =
      await this.prisma.business_unit_room.findMany({
        where,
        skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
        take: sanitizedLimit,
        select: {
          id: true,
          business_unit_id: true,
          code: true,
          name: true,
          description: true,
          item_order: true,
          capacity: true,
          active: true,
          readonly: true,
        },
        orderBy: [
          {
            item_order: 'asc',
          },
          {
            name: 'asc',
          },
          {
            code: 'asc',
          },
        ],
      });

    return {
      data: businessUnitRooms.map((businessUnitRoom) => ({
        id: businessUnitRoom.id,
        business_unit_id: businessUnitRoom.business_unit_id,
        code: businessUnitRoom.code,
        name: businessUnitRoom.name,
        description: businessUnitRoom.description,
        item_order: businessUnitRoom.item_order,
        capacity: businessUnitRoom.capacity,
        active: businessUnitRoom.active,
        readonly: businessUnitRoom.readonly,
      })),
      meta: {
        total,
        page: sanitizedPage,
        lastPage,
      },
    };
  }

  async findOne(tenantId: string, businessUnitId: string, id: string) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
    );

    return await this.prisma.business_unit_room.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      select: {
        id: true,
        business_unit_id: true,
        code: true,
        name: true,
        description: true,
        item_order: true,
        capacity: true,
        active: true,
        readonly: true,
      },
    });
  }

  async findOneByCode(tenantId: string, businessUnitId: string, code: string) {
    await this.helper.assertBusinessUnitRoomExistsInTenantByCode(
      tenantId,
      businessUnitId,
      code,
    );

    return await this.prisma.business_unit_room.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      select: {
        id: true,
        business_unit_id: true,
        code: true,
        name: true,
        description: true,
        item_order: true,
        capacity: true,
        active: true,
        readonly: true,
      },
    });
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    id: string,
    payload: UpdateBusinessUnitRoomDto,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
      true,
    );

    if (payload.code) {
      await this.helper.assertCodeNotRepeated(tenantId, payload.code, id);
    }

    return await this.prisma.business_unit_room.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
        readonly: false,
      },
      data: {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder,
        capacity: payload.capacity,
        ...(payload.active !== undefined && { active: payload.active }),
        extra_data: payload.extraData,
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
      true,
    );

    return await this.prisma.business_unit_room.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
        readonly: false,
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
