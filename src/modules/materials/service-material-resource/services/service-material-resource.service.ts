import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateServiceMaterialResourceDto,
  ICreateServiceMaterialResource,
} from '@shared-common';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { ServiceMaterialResourceHelperService } from './service-material-resource-helper.service';

import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class ServiceMaterialResourceService {
  constructor(
    private prisma: PrismaService,
    private helper: ServiceMaterialResourceHelperService,
    private utils: UtilsService,
  ) {}

  async upsert(tenantId: string, payload: CreateServiceMaterialResourceDto) {
    await this.helper.assertServiceExists(tenantId, payload.serviceId);

    const safeMaterialResourceIds = payload.materialResourceIds || [];

    if (safeMaterialResourceIds.length === 0) {
      throw new BadRequestException(
        'No se proporcionaron IDs de recursos materiales',
      );
    }

    await this.helper.assertMaterialResourcesExist(
      tenantId,
      safeMaterialResourceIds,
    );

    await this.helper.removeMaterialResourcesFromService(
      tenantId,
      payload.serviceId,
    );

    const createData: ICreateServiceMaterialResource[] = [];
    const now = new Date();

    const uniqueIds = Array.from(new Set(safeMaterialResourceIds));

    uniqueIds.forEach((materialResourceId) => {
      createData.push({
        id: uuidv7(),
        serviceId: payload.serviceId,
        materialResourceId: materialResourceId,
      });
    });

    if (createData.length > 0) {
      await this.prisma.service_material_resource.createMany({
        data: createData.map((item) => ({
          id: item.id,
          service_id: item.serviceId,
          material_resource_id: item.materialResourceId,
          created_at: now,
        })),
        skipDuplicates: true,
      });
    }
  }

  async findByService(
    tenantId: string,
    searchFilters: BaseSearchPaginationDto,
    serviceId?: string | null,
  ) {
    const { search, page, limit } = searchFilters;

    const where: Prisma.service_material_resourceWhereInput =
      this.helper.applySearchFilters(tenantId, serviceId, search);

    const sanitizedPage = page ? page : 1;
    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.service_material_resource.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const data = await this.prisma.service_material_resource.findMany({
      where,
      skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
      take: sanitizedLimit,
      include: {
        material_resource: true,
      },
      orderBy: {
        material_resource: {
          code: 'asc',
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

  async delete(
    tenantId: string,
    serviceId: string,
    materialResourceId: string,
  ) {
    await this.prisma.service_material_resource.deleteMany({
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
  }
}
