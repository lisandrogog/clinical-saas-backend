import { Injectable } from '@nestjs/common';
import {
  CreateBusinessUnitMaterialResourceDto,
  UpdateBusinessUnitMaterialResourceDto,
} from '@shared-common';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services/utils.service';
import { BusinessUnitMaterialResourceHelperService } from './business-unit-material-resource-helper.service';

@Injectable()
export class BusinessUnitMaterialResourceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
    private readonly helper: BusinessUnitMaterialResourceHelperService,
  ) {}

  async create(
    tenantId: string,
    businessUnitId: string,
    payload: CreateBusinessUnitMaterialResourceDto,
    userId?: string,
  ) {
    const {
      materialResourceId,
      quantity,
      quantityAvailable,
      quantityReserved,
    } = payload;

    await this.helper.assertExistsBusinessUnitInTenant(
      tenantId,
      businessUnitId,
    );

    await this.helper.assertExistsMaterialResourceInTenant(
      tenantId,
      materialResourceId,
    );
    await this.helper.assertNotExistsRelationship(
      tenantId,
      businessUnitId,
      materialResourceId,
    );

    return await this.prisma.business_unit_material_resource.create({
      data: {
        business_unit_id: businessUnitId,
        material_resource_id: materialResourceId,
        quantity,
        quantity_available: quantityAvailable,
        quantity_reserved: quantityReserved,
        created_by: userId,
      },
      select: {
        id: true,
        created_at: true,
      },
    });
  }

  async getUnits(
    tenantId: string,
    id: string,
    searchFilters: Omit<BaseSearchPaginationDto, 'search'>,
  ) {
    await this.helper.assertExistsMaterialResourceInTenant(tenantId, id);

    const { page, limit } = searchFilters;

    const where: Prisma.business_unit_material_resourceWhereInput = {
      material_resource_id: id,
      material_resource: {
        tenant_id: tenantId,
      },
    };

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_unit_material_resource.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const data = await this.prisma.business_unit_material_resource.findMany({
      where,
      take: sanitizedLimit,
      skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
      select: {
        id: true,
        business_unit: {
          select: {
            id: true,
            business_name: true,
            code: true,
          },
        },
        quantity: true,
        quantity_available: true,
        quantity_reserved: true,
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

  async getMaterials(
    tenantId: string,
    businessUnitId: string,
    searchFilters: BaseSearchPaginationDto,
  ) {
    await this.helper.assertExistsBusinessUnitInTenant(
      tenantId,
      businessUnitId,
    );

    const { page, limit, search } = searchFilters;

    const where: Prisma.business_unit_material_resourceWhereInput = {
      business_unit_id: businessUnitId,
      business_unit: {
        tenant_id: tenantId,
        removed_at: null,
      },
      material_resource: {
        tenant_id: tenantId,
        removed_at: null,
      },
      ...(search && {
        material_resource: {
          OR: [
            {
              code: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
    };

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_unit_material_resource.count({
      where,
    });

    const lastPage = this.utils.calculateLastPage(total, sanitizedLimit);

    const data = await this.prisma.business_unit_material_resource.findMany({
      where,
      take: sanitizedLimit,
      skip: this.utils.calculateSkip(sanitizedPage, sanitizedLimit),
      select: {
        id: true,
        material_resource: {
          select: {
            id: true,
            code: true,
            name: true,
            active: true,
            readonly: true,
            material_resource_type_id: true,
          },
        },
        quantity: true,
        quantity_available: true,
        quantity_reserved: true,
      },
      orderBy: [
        {
          material_resource: {
            name: 'asc',
          },
        },
        {
          material_resource: {
            code: 'asc',
          },
        },
      ],
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

  async getBusinessUnitMaterialResourceById(
    tenantId: string,
    businessUnitId: string,
    id: string,
  ) {
    await this.helper.assertExistsBusinessUnitInTenant(
      tenantId,
      businessUnitId,
    );

    await this.helper.assertExistsMaterialResourceInTenant(tenantId, id);

    return await this.prisma.business_unit_material_resource.findUnique({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        material_resource: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      select: {
        id: true,
        material_resource: {
          select: {
            id: true,
            code: true,
            name: true,
            active: true,
            readonly: true,
            material_resource_type_id: true,
          },
        },
        business_unit: {
          select: {
            id: true,
            business_name: true,
            code: true,
          },
        },
        quantity: true,
        quantity_available: true,
        quantity_reserved: true,
      },
    });
  }

  async update(
    tenantId: string,
    businessUnitId: string,
    id: string,
    payload: UpdateBusinessUnitMaterialResourceDto,
    userId?: string,
  ) {
    await this.helper.assertExistsBusinessUnitInTenant(
      tenantId,
      businessUnitId,
    );

    if (payload.materialResourceId) {
      await this.helper.assertExistsMaterialResourceInTenant(
        tenantId,
        payload.materialResourceId,
      );

      await this.helper.assertExistsRelationship(
        tenantId,
        businessUnitId,
        payload.materialResourceId,
      );
    }

    return await this.prisma.business_unit_material_resource.update({
      where: {
        id,
        business_unit_id: businessUnitId,
        material_resource_id: payload.materialResourceId,
      },
      data: {
        quantity: payload.quantity,
        quantity_available: payload.quantityAvailable,
        quantity_reserved: payload.quantityReserved,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async remove(tenantId: string, businessUnitId: string, id: string) {
    await this.helper.assertExistsBusinessUnitInTenant(
      tenantId,
      businessUnitId,
    );

    await this.helper.assertExistsMaterialResourceInTenant(tenantId, id);

    await this.helper.assertExistsRelationship(tenantId, businessUnitId, id);

    return await this.prisma.business_unit_material_resource.delete({
      where: {
        id,
        business_unit_id: businessUnitId,
      },
    });
  }
}
