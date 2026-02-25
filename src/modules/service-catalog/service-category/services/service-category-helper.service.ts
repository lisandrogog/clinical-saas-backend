import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { CreateServiceCategoryDto } from '../dto/create-service-category.dto';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceCategoryHelperService {
  constructor(private readonly prisma: PrismaService) {}

  async assertServiceCategoryExists(tenantId: string, id: string) {
    const serviceCategoryExists = await this.prisma.service_category.count({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (serviceCategoryExists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  async assertServiceCategoryNotExists(
    tenantId: string,
    dto: CreateServiceCategoryDto,
  ) {
    const serviceCategoryExists = await this.prisma.service_category.count({
      where: {
        tenant_id: tenantId,
        name: dto.name,
        code: dto.code,
        removed_at: null,
      },
    });

    if (serviceCategoryExists > 0) {
      throw new BadRequestException(I18nKeys.errors.alreadyExists);
    }
  }
}
