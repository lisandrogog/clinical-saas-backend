import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { SearchServiceDto } from '../dto';
import { UtilsService } from '@modules/utils/services';
import { I18nKeys } from '../constants/i18n.constants';
import { I18nKeys as ServiceCategoryI18nKeys } from '@modules/service-catalog/service-category/constants/i18n.constants';

@Injectable()
export class ServiceHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async assertExistsService(tenantId: string, id: string): Promise<void> {
    const existsService = await this.prisma.service.count({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existsService === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  async assertExistsCategory(
    tenantId: string,
    serviceCategoryId: string,
  ): Promise<void> {
    const existCategory = await this.prisma.service_category.count({
      where: {
        id: serviceCategoryId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existCategory === 0) {
      throw new NotFoundException(ServiceCategoryI18nKeys.errors.notFound);
    }
  }

  async assertCodeNotExists(tenantId: string, code: string): Promise<void> {
    const existsCode = await this.prisma.service.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existsCode > 0) {
      throw new BadRequestException(I18nKeys.errors.alreadyExists);
    }
  }

  async assertCodeIsNotRepeated(
    tenantId: string,
    id: string,
    code: string,
  ): Promise<void> {
    const existsCode = await this.prisma.service.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
        NOT: { id },
      },
    });

    if (existsCode > 0) {
      throw new BadRequestException(I18nKeys.errors.alreadyExists);
    }
  }

  applySearchFilters(
    tenantId: string,
    searchFilters: SearchServiceDto,
  ): Prisma.serviceWhereInput {
    const where: Prisma.serviceWhereInput = {
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

    if (!searchFilters.serviceCategoryIds) {
      return where;
    }

    const serviceCategoryIds: string[] = [];

    if (Array.isArray(searchFilters.serviceCategoryIds)) {
      serviceCategoryIds.push(...searchFilters.serviceCategoryIds);
    } else {
      if (searchFilters.serviceCategoryIds) {
        serviceCategoryIds.push(searchFilters.serviceCategoryIds);
      }
    }

    if (serviceCategoryIds && serviceCategoryIds.length > 0) {
      where.service_category_id = {
        in: serviceCategoryIds,
      };
    }

    return where;
  }
}
