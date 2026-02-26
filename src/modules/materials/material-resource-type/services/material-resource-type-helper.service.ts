import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class MaterialResourceTypeHelperService {
  constructor(private readonly prisma: PrismaService) {}

  async assertExists(
    id: number,
    checkEditable: boolean = false,
  ): Promise<void> {
    const exists = await this.prisma.material_resource_type.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        readonly: true,
      },
    });

    if (!exists) {
      throw new NotFoundException('Material resource type not found');
    }

    if (checkEditable && exists.readonly) {
      throw new BadRequestException('Material resource type is readonly');
    }
  }

  async assertExistsEditable(id: number): Promise<void> {
    await this.assertExists(id, true);
  }

  async assertExistsAndNotUsed(id: number): Promise<void> {
    await this.assertExistsEditable(id);

    const existsMaterials = await this.prisma.material_resource.count({
      where: {
        material_resource_type_id: id,
        removed_at: null,
      },
    });

    if (existsMaterials > 0) {
      throw new BadRequestException('Material resource type is used');
    }
  }

  async assertExistsCode(code: string): Promise<void> {
    const exists = await this.prisma.material_resource_type.count({
      where: {
        code,
      },
    });

    if (!exists) {
      throw new NotFoundException('Material resource type not found');
    }
  }

  async assertCodeNotExists(code: string): Promise<void> {
    const exists = await this.prisma.material_resource_type.count({
      where: {
        code,
      },
    });

    if (exists > 0) {
      throw new BadRequestException(
        'Material resource type code already exists',
      );
    }
  }

  async assertCodeNotRepeated(code: string, id: number): Promise<void> {
    const exists = await this.prisma.material_resource_type.count({
      where: {
        code,
        id: {
          not: id,
        },
      },
    });

    if (exists > 0) {
      throw new BadRequestException(
        'Material resource type code already exists with another id',
      );
    }
  }
}
