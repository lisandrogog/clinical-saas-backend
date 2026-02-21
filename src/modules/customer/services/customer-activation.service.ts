import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { CustomerHelperService } from './customer-helper.service';

@Injectable()
export class CustomerActivationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerHelperService: CustomerHelperService,
  ) {}

  async disable(tenantId: string, id: string, userId?: string) {
    await this.customerHelperService.assertCustomerExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_customer: true,
        active: true,
      },
      data: {
        active: false,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async enable(tenantId: string, id: string, userId?: string) {
    await this.customerHelperService.assertCustomerExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_customer: true,
        active: false,
      },
      data: {
        active: true,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }
}
