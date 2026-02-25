import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { ServiceHelperService } from './service-helper.service';

@Injectable()
export class ServiceActivationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceHelperService: ServiceHelperService,
  ) {}

  async disable(tenantId: string, id: string, userId?: string) {
    await this.serviceHelperService.assertExistsService(tenantId, id);

    return await this.prisma.service.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
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
    await this.serviceHelperService.assertExistsService(tenantId, id);

    return await this.prisma.service.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
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
