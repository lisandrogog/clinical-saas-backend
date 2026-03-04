import { PrismaService } from '@core/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class BusinessUnitRoomHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async assertBusinessUnitExistsInTenant(
    tenantId: string,
    businessUnitId: string,
  ): Promise<void> {
    const count = await this.prisma.business_unit.count({
      where: {
        id: businessUnitId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (count === 0) {
      throw new NotFoundException('Business unit not found');
    }
  }

  async assertCodeNotExistsInTenant(
    tenantId: string,
    code: string,
  ): Promise<void> {
    const count = await this.prisma.business_unit_room.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (count > 0) {
      throw new BadRequestException('Code already exists');
    }
  }

  async assertCodeNotRepeated(
    tenantId: string,
    code: string,
    id: string,
  ): Promise<void> {
    const count = await this.prisma.business_unit_room.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
        id: { not: id },
      },
    });

    if (count > 0) {
      throw new BadRequestException(
        'Code already exists with another business unit room',
      );
    }
  }

  async assertBusinessUnitRoomExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    id: string,
    checkReadOnly?: boolean,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      select: {
        id: true,
        readonly: true,
      },
    });

    if (!exists) {
      throw new NotFoundException('Business unit room not found');
    }

    if (checkReadOnly && exists.readonly) {
      throw new BadRequestException('Business unit room is readonly');
    }
  }

  async assertBusinessUnitRoomExistsInTenantByCode(
    tenantId: string,
    businessUnitId: string,
    code: string,
    checkReadOnly?: boolean,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
      },
      select: {
        id: true,
        readonly: true,
      },
    });

    if (!exists) {
      throw new NotFoundException('Business unit room not found');
    }

    if (checkReadOnly && exists.readonly) {
      throw new BadRequestException('Business unit room is readonly');
    }
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId?: string,
    search?: string,
  ): Prisma.business_unit_roomWhereInput {
    const where: Prisma.business_unit_roomWhereInput = {
      tenant_id: tenantId,
      ...(businessUnitId && { business_unit_id: businessUnitId }),
      removed_at: null,
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utils.sanitizeSearch(search);
      where.OR = [
        {
          code: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
      ];
    }

    return where;
  }
}
