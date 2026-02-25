import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { ServiceHelperService } from './service-helper.service';
import { UtilsService } from '@modules/utils/services';
import {
  IServiceSearchResponse,
  ISingleServiceSearch,
} from '../interfaces/service-search.interface';
import { CreateServiceDto, SearchServiceDto, UpdateServiceDto } from '../dto';
import { Prisma } from '@prisma/client';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly serviceHelperService: ServiceHelperService,
  ) {}

  async create(tenantId: string, dto: CreateServiceDto, userId?: string) {
    await this.serviceHelperService.assertExistsCategory(
      tenantId,
      dto.serviceCategoryId,
    );

    await this.serviceHelperService.assertCodeNotExists(tenantId, dto.code);

    const id = uuidv7();

    return await this.prisma.service.create({
      data: {
        id,
        tenant_id: tenantId,
        service_category_id: dto.serviceCategoryId,
        code: dto.code,
        name: dto.name,
        base_price: dto.basePrice,
        base_cost: dto.baseCost,
        duration: dto.duration,
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
    searchFilters: SearchServiceDto,
  ): Promise<IServiceSearchResponse> {
    const where = this.serviceHelperService.applySearchFilters(
      tenantId,
      searchFilters,
    );

    const page = searchFilters.page ? searchFilters.page : 1;

    const limit = searchFilters.limit ? searchFilters.limit : 10;

    const skip = this.utilsService.calculateSkip(page, limit);

    const [total, data] = await Promise.all([
      this.prisma.service.count({
        where,
      }),
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          code: true,
          name: true,
          active: true,
          duration: true,
          service_category_id: true,
        },
        orderBy: [
          {
            service_category: {
              name: 'asc',
            },
          },
          {
            name: 'asc',
          },
        ],
      }),
    ]);

    return this.utilsService.wrapPaginatedResponse(data, total, page, limit);
  }

  async findOne(tenantId: string, id: string): Promise<ISingleServiceSearch> {
    return await this.getOne({
      id,
      tenant_id: tenantId,
      removed_at: null,
    });
  }

  async getByCode(
    tenantId: string,
    code: string,
  ): Promise<ISingleServiceSearch> {
    return await this.getOne({
      code,
      tenant_id: tenantId,
      removed_at: null,
    });
  }

  private async getOne(
    where: Prisma.serviceWhereInput,
  ): Promise<ISingleServiceSearch> {
    const service = await this.prisma.service.findFirst({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        active: true,
        service_category_id: true,
        base_price: true,
        base_cost: true,
        duration: true,
      },
    });

    if (!service) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }

    return service;
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdateServiceDto,
    userId?: string,
  ) {
    await this.serviceHelperService.assertExistsService(tenantId, id);

    if (payload.serviceCategoryId) {
      await this.serviceHelperService.assertExistsCategory(
        tenantId,
        payload.serviceCategoryId,
      );
    }

    if (payload.code) {
      await this.serviceHelperService.assertCodeIsNotRepeated(
        tenantId,
        id,
        payload.code,
      );
    }

    return await this.prisma.service.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        code: payload.code,
        name: payload.name,
        base_price: payload.basePrice,
        base_cost: payload.baseCost,
        duration: payload.duration,
        ...(payload.active !== undefined && { active: payload.active }),
        ...(payload.serviceCategoryId && {
          service_category_id: payload.serviceCategoryId,
        }),
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
    await this.serviceHelperService.assertExistsService(tenantId, id);

    return await this.prisma.service.update({
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
