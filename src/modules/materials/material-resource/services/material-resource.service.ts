import { Injectable } from '@nestjs/common';
import { CreateMaterialResourceDto, UpdateMaterialResourceDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { MaterialResourceHelperService } from './material-resource-helper.service';
import { uuidv7 } from 'uuidv7';
import { Prisma } from '@prisma/client';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import {
  IMaterialResourceSearch,
  IMaterialResourceSearchResponse,
} from '../interfaces/material-resource-search.interface';
import { MaterialResourceTypeHelperService } from '@modules/materials/material-resource-type/services';

@Injectable()
export class MaterialResourceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: MaterialResourceHelperService,
    private readonly typeHelper: MaterialResourceTypeHelperService,
  ) {}

  async create(
    tenantId: string,
    payload: CreateMaterialResourceDto,
    userId?: string,
  ) {
    await this.helper.assertCodeNotExists(tenantId, payload.code);

    await this.typeHelper.assertExists(payload.materialResourceTypeId);

    const id = uuidv7();

    return await this.prisma.material_resource.create({
      data: {
        id,
        tenant_id: tenantId,
        material_resource_type_id: payload.materialResourceTypeId,
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder || 0,
        active: true,
        created_by: userId,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll(
    tenantId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IMaterialResourceSearchResponse> {
    const { search, page, limit } = searchFilters;

    const where: Prisma.material_resourceWhereInput =
      this.helper.applySearchFilters(tenantId, search);

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.material_resource.count({
      where,
    });

    const lastPage = Math.ceil(total / sanitizedLimit);

    const materialResources: IMaterialResourceSearch[] =
      await this.prisma.material_resource.findMany({
        where,
        skip: (sanitizedPage - 1) * sanitizedLimit,
        take: sanitizedLimit,
        select: {
          id: true,
          code: true,
          name: true,
          description: true,
          item_order: true,
          active: true,
          readonly: true,
          material_resource_type_id: true,
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
      data: materialResources.map((materialResource) => ({
        id: materialResource.id,
        code: materialResource.code,
        name: materialResource.name,
        description: materialResource.description,
        item_order: materialResource.item_order,
        active: materialResource.active,
        readonly: materialResource.readonly,
        material_resource_type_id: materialResource.material_resource_type_id,
      })),
      meta: {
        total,
        page: sanitizedPage,
        lastPage,
      },
    };
  }

  async findOne(tenantId: string, id: string) {
    await this.helper.assertMaterialResourceExists(tenantId, id);

    return await this.prisma.material_resource.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        item_order: true,
        active: true,
        readonly: true,
        material_resource_type_id: true,
      },
    });
  }

  async findByCode(tenantId: string, code: string) {
    await this.helper.assertMaterialResourceExistsByCode(tenantId, code);

    return await this.prisma.material_resource.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        item_order: true,
        active: true,
        readonly: true,
        material_resource_type_id: true,
      },
    });
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdateMaterialResourceDto,
    userId?: string,
  ) {
    await this.helper.assertMaterialResourceExists(tenantId, id, true);

    if (payload.code) {
      await this.helper.assertCodeNotRepeated(tenantId, payload.code, id);
    }

    if (payload.materialResourceTypeId) {
      await this.typeHelper.assertExists(payload.materialResourceTypeId);
    }

    return await this.prisma.material_resource.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        readonly: false,
      },
      data: {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder,
        ...(payload.active !== undefined && { active: payload.active }),
        material_resource_type_id: payload.materialResourceTypeId,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async remove(tenantId: string, id: string, userId?: string) {
    await this.helper.assertMaterialResourceExists(tenantId, id, true);

    return await this.prisma.material_resource.update({
      where: {
        id,
        tenant_id: tenantId,
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
