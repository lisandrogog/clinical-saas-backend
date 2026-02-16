import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto, userId?: string) {
    const id = uuidv7();

    return await this.prisma.role.create({
      data: {
        id,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder || 0,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.role.findMany({
      where: { removed_at: null },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.role.findUnique({
      where: { id, removed_at: null },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.role.findFirst({
      where: { code, removed_at: null },
    });
  }

  async update(id: string, dto: UpdateRoleDto, userId?: string) {
    return await this.prisma.role.update({
      where: { id, removed_at: null },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        item_order: dto.itemOrder,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, userId?: string) {
    return await this.prisma.role.update({
      where: { id, removed_at: null },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
