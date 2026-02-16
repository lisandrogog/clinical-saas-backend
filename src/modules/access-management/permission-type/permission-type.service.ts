import { Injectable } from '@nestjs/common';
import { CreatePermissionTypeDto } from './dto/create-permission-type.dto';
import { UpdatePermissionTypeDto } from './dto/update-permission-type.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class PermissionTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePermissionTypeDto) {
    return await this.prisma.permission_type.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.permission_type.findMany({
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.permission_type.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.permission_type.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdatePermissionTypeDto) {
    return await this.prisma.permission_type.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdatePermissionTypeDto) {
    return await this.prisma.permission_type.upsert({
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
