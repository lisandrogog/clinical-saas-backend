import { Injectable } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { uuidv7 } from 'uuidv7';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class ServiceCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    tenantId: string,
    dto: CreateServiceCategoryDto,
    userId?: string,
  ) {
    const id = uuidv7();

    return await this.prisma.service_category.create({
      data: {
        id,
        tenant_id: tenantId,
        code: dto.code,
        name: dto.name,
        active: dto.active ?? true,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.service_category.findMany({
      where: {
        tenant_id: tenantId,
        removed_at: null,
      },
      orderBy: {
        code: 'asc',
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.service_category.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
    });
  }

  async update(
    id: string,
    tenantId: string,
    dto: UpdateServiceCategoryDto,
    userId?: string,
  ) {
    return await this.prisma.service_category.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        code: dto.code,
        name: dto.name,
        ...(dto.active !== undefined && { active: dto.active }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, tenantId: string, userId?: string) {
    return await this.prisma.service_category.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
