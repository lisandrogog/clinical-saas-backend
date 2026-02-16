import { Injectable } from '@nestjs/common';
import { CreateAppSubModuleDto } from './dto/create-app-sub-module.dto';
import { UpdateAppSubModuleDto } from './dto/update-app-sub-module.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class AppSubModuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppSubModuleDto) {
    return await this.prisma.app_sub_module.create({
      data: {
        code: dto.code,
        name: dto.name,
        app_module_id: dto.appModuleId,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll(appModuleId: number) {
    return await this.prisma.app_sub_module.findMany({
      where: { app_module_id: appModuleId },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.app_sub_module.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string, appModuleId: number) {
    return await this.prisma.app_sub_module.findUnique({
      where: {
        app_module_id_code: {
          code,
          app_module_id: appModuleId,
        },
      },
    });
  }

  async update(id: number, dto: UpdateAppSubModuleDto) {
    return await this.prisma.app_sub_module.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        app_module_id: dto.appModuleId,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdateAppSubModuleDto) {
    return await this.prisma.app_sub_module.upsert({
      where: {
        app_module_id_code: {
          code: dto.code!,
          app_module_id: dto.appModuleId!,
        },
      },
      update: {
        name: dto.name,
        item_order: dto.itemOrder,
      },
      create: {
        code: dto.code!,
        name: dto.name!,
        app_module_id: dto.appModuleId!,
        item_order: dto.itemOrder || 0,
      },
    });
  }
}
