import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services';

@Injectable()
export class MaterialResourceHelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async assertMaterialResourceExists(
    tenantId: string,
    id: string,
    checkReadonly: boolean = false,
  ): Promise<void> {
    const exists = await this.prisma.material_resource.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        readonly: true,
      },
    });

    if (!exists) {
      throw new NotFoundException('Material resource not found');
    }

    if (checkReadonly && exists.readonly) {
      throw new BadRequestException('Material resource is readonly');
    }
  }

  async assertMaterialResourceExistsByCode(
    tenantId: string,
    code: string,
    checkReadonly: boolean = false,
  ): Promise<void> {
    const exists = await this.prisma.material_resource.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
      select: {
        id: true,
        readonly: true,
      },
    });

    if (!exists) {
      throw new NotFoundException('Material resource not found');
    }

    if (checkReadonly && exists.readonly) {
      throw new BadRequestException('Material resource is readonly');
    }
  }

  async assertMaterialResourceNotExists(
    tenantId: string,
    id: string,
  ): Promise<void> {
    const exists = await this.prisma.material_resource.count({
      where: { id, tenant_id: tenantId, removed_at: null },
    });

    if (exists > 0) {
      throw new BadRequestException('Material resource already exists');
    }
  }

  async assertCodeNotExists(tenantId: string, code: string): Promise<void> {
    const exists = await this.prisma.material_resource.count({
      where: { code, tenant_id: tenantId, removed_at: null },
    });

    if (exists > 0) {
      throw new BadRequestException('Code already exists');
    }
  }

  async assertCodeNotRepeated(
    tenantId: string,
    code: string,
    id: string,
  ): Promise<void> {
    const exists = await this.prisma.material_resource.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
        id: { not: id },
      },
    });

    if (exists > 0) {
      throw new BadRequestException(
        'Code already exists with another material resource',
      );
    }
  }

  applySearchFilters(tenantId: string, search?: string) {
    const where: Prisma.material_resourceWhereInput = {
      tenant_id: tenantId,
      removed_at: null,
    };

    if (search && search.trim().length > 0) {
      const sanitizedSearch = this.utilsService.sanitizeSearch(search);
      where.OR = [
        {
          code: {
            contains: sanitizedSearch,
            mode: 'insensitive',
          },
        },
        { name: { contains: sanitizedSearch, mode: 'insensitive' } },
        { description: { contains: sanitizedSearch, mode: 'insensitive' } },
        {
          material_resource_type: {
            name: { contains: sanitizedSearch, mode: 'insensitive' },
          },
        },
        {
          material_resource_type: {
            code: {
              contains: sanitizedSearch,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    return where;
  }
}
