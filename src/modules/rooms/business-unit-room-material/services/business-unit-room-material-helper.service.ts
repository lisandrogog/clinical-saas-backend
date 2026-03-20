import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { BusinessUnitRoomMaterialDto } from '@shared-common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BusinessUnitRoomMaterialHelperService {
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

  async assertMaterialExistsInTenant(
    tenantId: string,
    materialId: string,
  ): Promise<void> {
    const exists = await this.prisma.material_resource.count({
      where: {
        id: materialId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException('Material resource not found');
    }
  }

  async assertBusinessUnitRoomMaterialExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    payload: BusinessUnitRoomMaterialDto,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room_material.count({
      where: {
        business_unit_room_id: payload.businessUnitRoomId,
        material_resource_id: payload.materialId,
        business_unit_room: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
        removed_at: null,
      },
    });

    if (exists === 0) {
      throw new NotFoundException('Business unit room material not found');
    }
  }

  async assertBusinessUnitRoomMaterialNotExistsInTenant(
    tenantId: string,
    businessUnitId: string,
    payload: BusinessUnitRoomMaterialDto,
  ): Promise<void> {
    const exists = await this.prisma.business_unit_room_material.count({
      where: {
        business_unit_room_id: payload.businessUnitRoomId,
        material_resource_id: payload.materialId,
        business_unit_room: {
          tenant_id: tenantId,
          business_unit_id: businessUnitId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
        removed_at: null,
      },
    });

    if (exists > 0) {
      throw new BadRequestException(
        'Business unit room material already exists',
      );
    }
  }

  applySearchFilters(
    tenantId: string,
    businessUnitId?: string,
    search?: string,
  ): Prisma.business_unit_room_materialWhereInput {
    const where: Prisma.business_unit_room_materialWhereInput = {
      business_unit_room: {
        tenant_id: tenantId,
        ...(businessUnitId && { business_unit_id: businessUnitId }),
        removed_at: null,
      },
      material_resource: {
        tenant_id: tenantId,
        removed_at: null,
      },
      removed_at: null,
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
          material_resource: {
            code: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
        {
          material_resource: {
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
