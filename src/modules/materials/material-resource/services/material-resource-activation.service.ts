import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import { MaterialResourceHelperService } from './material-resource-helper.service';

@Injectable()
export class MaterialResourceActivationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly materialResourceHelperService: MaterialResourceHelperService,
  ) {}

  async disable(tenantId: string, id: string, userId?: string) {
    await this.materialResourceHelperService.assertMaterialResourceExists(
      tenantId,
      id,
    );

    return await this.prisma.material_resource.update({
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
    await this.materialResourceHelperService.assertMaterialResourceExists(
      tenantId,
      id,
    );

    return await this.prisma.material_resource.update({
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
