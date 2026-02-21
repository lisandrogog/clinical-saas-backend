import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerHelperService {
  constructor(private readonly prisma: PrismaService) {}

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
      throw new BadRequestException('Customer already exists');
    }
  }

  sanitizeSearch(search: string) {
    return search.trim().toLowerCase();
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
      throw new BadRequestException('Customer not exists');
    }
  }

  applySearchFilters(tenantId: string, search?: string) {
    const where: Prisma.business_partnerWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
      is_customer: true,
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.sanitizeSearch(search);
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
