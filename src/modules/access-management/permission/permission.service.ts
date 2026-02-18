import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePermissionDto, userId?: string) {
    const id = uuidv7();

    return await this.prisma.permission.create({
      data: {
        id,
        role_id: dto.roleId,
        app_sub_module_id: dto.subModuleId,
        access_scope_id: dto.accessScopeId,
        permission_type_id: dto.permissionTypeId,
        item_order: dto.itemOrder || 0,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.permission.findMany({
      where: { removed_at: null },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findByRoleId(roleId: string) {
    return await this.prisma.permission.findMany({
      where: { role_id: roleId, removed_at: null },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findByModuleId(moduleId: number) {
    return await this.prisma.permission.findMany({
      where: { app_sub_module: { app_module_id: moduleId }, removed_at: null },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findBySubModuleId(subModuleId: number) {
    return await this.prisma.permission.findMany({
      where: { app_sub_module_id: subModuleId, removed_at: null },
      orderBy: {
        item_order: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.permission.findUnique({
      where: { id, removed_at: null },
    });
  }

  async update(id: string, dto: UpdatePermissionDto, userId?: string) {
    return await this.prisma.permission.update({
      where: { id, removed_at: null, readonly: false },
      data: {
        role_id: dto.roleId,
        app_sub_module_id: dto.subModuleId,
        access_scope_id: dto.accessScopeId,
        permission_type_id: dto.permissionTypeId,
        item_order: dto.itemOrder,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, userId?: string) {
    return await this.prisma.permission.update({
      where: { id, removed_at: null, readonly: false },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
