import { Injectable } from '@nestjs/common';
import { CreateAccessScopeDto } from './dto/create-access-scope.dto';
import { UpdateAccessScopeDto } from './dto/update-access-scope.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class AccessScopeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAccessScopeDto) {
    return await this.prisma.access_scope.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.access_scope.findMany({
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.access_scope.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.access_scope.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateAccessScopeDto) {
    return await this.prisma.access_scope.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdateAccessScopeDto) {
    return await this.prisma.access_scope.upsert({
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
