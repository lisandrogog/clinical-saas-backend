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
export class CustomerHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async assertCustomerNotExists(
    tenantId: string,
    identificationTypeId: number,
    identificationNumber: string,
  ) {
    const existingCustomer = await this.prisma.business_partner.count({
      where: {
        tenant_id: tenantId,
        identification_type_id: identificationTypeId,
        identification_number: identificationNumber,
        removed_at: null,
        is_customer: true,
      },
    });

    if (existingCustomer > 0) {
      throw new BadRequestException(I18nKeys.errors.alreadyExists);
    }
  }

  async assertCustomerExists(tenantId: string, id: string) {
    const customerExists = await this.prisma.business_partner.count({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_customer: true,
      },
    });

    if (customerExists === 0) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }
  }

  applySearchFilters(tenantId: string, search?: string) {
    const where: Prisma.business_partnerWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
      is_customer: true,
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
