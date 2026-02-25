import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ProviderHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async assertProviderNotExists(
    tenantId: string,
    identificationTypeId: number,
    identificationNumber: string,
  ) {
    const existingProvider = await this.prisma.business_partner.count({
      where: {
        tenant_id: tenantId,
        identification_type_id: identificationTypeId,
        identification_number: identificationNumber,
        removed_at: null,
        is_supplier: true,
      },
    });

    if (existingProvider > 0) {
      throw new BadRequestException(I18nKeys.errors.alreadyExists);
    }
  }

  async assertProviderExists(tenantId: string, id: string) {
    const providerExists = await this.prisma.business_partner.count({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
      },
    });

    if (providerExists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  // TODO: agregar servicios en el search
  applySearchFilters(tenantId: string, search?: string) {
    const where: Prisma.business_partnerWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
      is_supplier: true,
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utilsService.sanitizeSearch(search);
      where.OR = [
        {
          identification_number: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
        { first_name: { contains: sanitizedSearch, mode: 'insensitive' } },
        { last_name: { contains: sanitizedSearch, mode: 'insensitive' } },
      ];
    }

    return where;
  }
}
