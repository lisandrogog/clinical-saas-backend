import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceCategoryDto } from '../dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from '../dto/update-service-category.dto';
import { uuidv7 } from 'uuidv7';
import { PrismaService } from '@core/prisma.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';
import { ICategoryServiceSearchResponse } from '../interfaces/category-service-search.interface';
import { ServiceCategoryHelperService } from './service-category-helper.service';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly serviceCategoryHelperService: ServiceCategoryHelperService,
  ) {}

  async create(
    tenantId: string,
    payload: CreateServiceCategoryDto,
    userId?: string,
  ) {
    await this.serviceCategoryHelperService.assertServiceCategoryNotExists(
      tenantId,
      payload,
    );

    const id = uuidv7();

    return await this.prisma.service_category.create({
      data: {
        id,
        tenant_id: tenantId,
        code: payload.code,
        name: payload.name,
        created_at: new Date(),
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
  ): Promise<ICategoryServiceSearchResponse> {
    const where: Prisma.service_categoryWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
    };

    const search = this.utilsService.sanitizeSearch(searchFilters.search);

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const page = searchFilters.page ? searchFilters.page : 1;

    const limit = searchFilters.limit ? searchFilters.limit : 10;

    const skip = this.utilsService.calculateSkip(page, limit);

    const [total, data] = await Promise.all([
      this.prisma.service_category.count({
        where,
      }),
      this.prisma.service_category.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          code: true,
          name: true,
          active: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return this.utilsService.wrapPaginatedResponse(data, total, page, limit);
  }

  async findOne(tenantId: string, id: string) {
    const serviceCategory = await this.prisma.service_category.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        code: true,
        name: true,
        active: true,
      },
    });

    if (!serviceCategory) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }

    return serviceCategory;
  }

  async getOneByCode(tenantId: string, code: string) {
    const serviceCategory = await this.prisma.service_category.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        code: true,
        name: true,
        active: true,
      },
    });

    if (!serviceCategory) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }

    return serviceCategory;
  }

  async update(
    tenantId: string,
    id: string,
    dto: UpdateServiceCategoryDto,
    userId?: string,
  ) {
    await this.serviceCategoryHelperService.assertServiceCategoryExists(
      tenantId,
      id,
    );

    return await this.prisma.service_category.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        code: dto.code,
        name: dto.name,
        ...(dto.active !== undefined && { active: dto.active }),
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
    await this.serviceCategoryHelperService.assertServiceCategoryExists(
      tenantId,
      id,
    );

    return await this.prisma.service_category.update({
      where: { id, tenant_id: tenantId, removed_at: null },
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
