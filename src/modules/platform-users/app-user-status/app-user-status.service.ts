import { Injectable } from '@nestjs/common';
import { CreateAppUserStatusDto } from './dto/create-app-user-status.dto';
import { UpdateAppUserStatusDto } from './dto/update-app-user-status.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class AppUserStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAppUserStatusDto) {
    return await this.prisma.app_user_status.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.app_user_status.findMany({
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.app_user_status.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.app_user_status.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateAppUserStatusDto) {
    return await this.prisma.app_user_status.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdateAppUserStatusDto) {
    return await this.prisma.app_user_status.upsert({
      where: { code: dto.code! },
      update: {
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder,
      },
      create: {
        code: dto.code!,
        name: dto.name!,
        description: dto.description,
        item_order: dto.itemOrder || 0,
      },
    });
  }
}
