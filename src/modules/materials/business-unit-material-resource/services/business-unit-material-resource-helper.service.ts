import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class BusinessUnitMaterialResourceHelperService {
  constructor(private readonly prisma: PrismaService) {}

  async assertExistsBusinessUnitInTenant(
    tenantId: string,
    businessUnitId: string,
  ) {
    const businessUnit = await this.prisma.business_unit.count({
      where: {
        tenant_id: tenantId,
        id: businessUnitId,
        removed_at: null,
      },
    });

    if (businessUnit === 0) {
      throw new NotFoundException('Business unit not found in tenant');
    }
  }

  async assertExistsMaterialResourceInTenant(
    tenantId: string,
    materialResourceId: string,
  ) {
    const materialResource = await this.prisma.material_resource.count({
      where: {
        tenant_id: tenantId,
        id: materialResourceId,
        removed_at: null,
      },
    });
    if (materialResource === 0) {
      throw new NotFoundException('Material resource not found in tenant');
    }
  }

  async assertNotExistsRelationship(
    tenantId: string,
    businessUnitId: string,
    materialResourceId: string,
  ) {
    const businessUnitMaterialResource =
      await this.prisma.business_unit_material_resource.count({
        where: {
          business_unit_id: businessUnitId,
          material_resource_id: materialResourceId,
          material_resource: {
            tenant_id: tenantId,
          },
        },
      });

    if (businessUnitMaterialResource > 0) {
      throw new BadRequestException(
        'Business unit material resource already exists',
      );
    }
  }

  async assertExistsRelationship(
    tenantId: string,
    businessUnitId: string,
    materialResourceId: string,
  ) {
    const businessUnitMaterialResource =
      await this.prisma.business_unit_material_resource.count({
        where: {
          business_unit_id: businessUnitId,
          material_resource_id: materialResourceId,
          material_resource: {
            tenant_id: tenantId,
          },
        },
      });

    if (businessUnitMaterialResource === 0) {
      throw new NotFoundException('Business unit material resource not found');
    }
  }
}
