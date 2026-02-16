import { Injectable } from '@nestjs/common';
import { CreateAppModuleDto } from './dto/create-app-module.dto';
import { UpdateAppModuleDto } from './dto/update-app-module.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class AppModuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppModuleDto) {
    return await this.prisma.app_module.create({
      data: {
        code: dto.code,
        name: dto.name,
        platform_id: dto.platformId,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll(platformId: number) {
    return await this.prisma.app_module.findMany({
      where: { platform_id: platformId },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.app_module.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string, platformId: number) {
    return await this.prisma.app_module.findUnique({
      where: {
        platform_id_code: {
          code,
          platform_id: platformId,
        },
      },
    });
  }

  async update(id: number, dto: UpdateAppModuleDto) {
    return await this.prisma.app_module.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdateAppModuleDto) {
    return await this.prisma.app_module.upsert({
      where: {
        platform_id_code: {
          code: dto.code!,
          platform_id: dto.platformId!,
        },
      },
      update: {
        name: dto.name,
        item_order: dto.itemOrder,
      },
      create: {
        code: dto.code!,
        name: dto.name!,
        platform_id: dto.platformId!,
        item_order: dto.itemOrder || 0,
      },
    });
  }
}
