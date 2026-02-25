import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { ProviderHelperService } from './provider-helper.service';

@Injectable()
export class ProviderActivationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly providerHelperService: ProviderHelperService,
  ) {}

  async disable(tenantId: string, id: string, userId?: string) {
    await this.providerHelperService.assertProviderExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
        active: true,
      },
      data: {
        active: false,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async enable(tenantId: string, id: string, userId?: string) {
    await this.providerHelperService.assertProviderExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
        active: false,
      },
      data: {
        active: true,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }
}
