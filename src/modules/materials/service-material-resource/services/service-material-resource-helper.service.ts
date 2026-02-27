import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { I18nKeys } from '../constants/i18n.constants';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class ServiceMaterialResourceHelperService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async assertServiceExists(tenantId: string, serviceId: string) {
    const serviceExists = await this.prisma.service.count({
      where: {
        id: serviceId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (serviceExists === 0) {
      throw new NotFoundException(I18nKeys.errors.serviceNotFound);
    }
  }

  async assertMaterialResourcesExist(
    tenantId: string,
    materialResourceIds: string[],
  ) {
    if (!materialResourceIds || materialResourceIds.length === 0) {
      return;
    }

    const uniqueIds = Array.from(new Set(materialResourceIds));

    const existsCount = await this.prisma.material_resource.count({
      where: {
        id: { in: uniqueIds },
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existsCount !== uniqueIds.length) {
      throw new NotFoundException(I18nKeys.errors.materialResourceNotFound);
    }
  }

  async assertServiceMaterialResourceExists(
    tenantId: string,
    serviceId: string,
    materialResourceId: string,
  ) {
    const exists = await this.prisma.service_material_resource.count({
      where: {
        service_id: serviceId,
        material_resource_id: materialResourceId,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (exists === 0) {
      throw new NotFoundException(`Service material resource not found`);
    }
  }

  async assertServiceMaterialResourceNotExists(
    tenantId: string,
    serviceId: string,
    materialResourceId: string,
  ) {
    const exists = await this.prisma.service_material_resource.count({
      where: {
        service_id: serviceId,
        material_resource_id: materialResourceId,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (exists > 0) {
      throw new BadRequestException(`Service material resource already exists`);
    }
  }

  async removeMaterialResourcesFromService(
    tenantId: string,
    serviceId: string,
  ) {
    await this.prisma.service_material_resource.deleteMany({
      where: {
        service_id: serviceId,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }

  applySearchFilters(
    tenantId: string,
    serviceId?: string | null,
    search?: string,
  ) {
    const where: Prisma.service_material_resourceWhereInput = {
      ...(serviceId && { service_id: serviceId }),
      service: {
        tenant_id: tenantId,
        removed_at: null,
      },
      material_resource: {
        tenant_id: tenantId,
        removed_at: null,
      },
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utilsService.sanitizeSearch(search);
      where.OR = [
        {
          material_resource: {
            name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          material_resource: {
            code: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
      ];
    }

    return where;
  }
}
