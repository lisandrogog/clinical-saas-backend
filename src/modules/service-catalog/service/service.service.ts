import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateServiceDto, userId?: string) {
    await this.assertExistsCategory(dto.serviceCategoryId, tenantId);

    await this.assertCodeNotExists(dto.code, tenantId);

    const id = uuidv7();

    return await this.prisma.service.create({
      data: {
        id,
        tenant_id: tenantId,
        service_category_id: dto.serviceCategoryId,
        code: dto.code,
        name: dto.name,
        base_price: dto.basePrice,
        base_cost: dto.baseCost,
        active: dto.active ?? true,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.service.findMany({
      where: {
        tenant_id: tenantId,
        removed_at: null,
      },
      orderBy: {
        code: 'asc',
      },
    });
  }

  async getAllByCategory(tenantId: string, serviceCategoryId: string) {
    await this.assertExistsCategory(serviceCategoryId, tenantId);

    return await this.prisma.service.findMany({
      where: {
        service_category_id: serviceCategoryId,
        tenant_id: tenantId,
        removed_at: null,
      },
      orderBy: {
        code: 'asc',
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.service.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
    });
  }

  async getByCode(code: string, tenantId: string) {
    return await this.prisma.service.findFirst({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
    });
  }

  async update(
    id: string,
    tenantId: string,
    dto: UpdateServiceDto,
    userId?: string,
  ) {
    if (dto.serviceCategoryId) {
      await this.assertExistsCategory(dto.serviceCategoryId, tenantId);
    }

    if (dto.code) {
      await this.assertCodeIsNotRepeated(dto.code, tenantId, id);
    }

    return await this.prisma.service.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        code: dto.code,
        name: dto.name,
        base_price: dto.basePrice,
        base_cost: dto.baseCost,
        ...(dto.active !== undefined && { active: dto.active }),
        ...(dto.serviceCategoryId && {
          service_category_id: dto.serviceCategoryId,
        }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, tenantId: string, userId?: string) {
    return await this.prisma.service.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertExistsCategory(categoryId: string, tenantId: string) {
    const existCategory = await this.prisma.service_category.count({
      where: {
        id: categoryId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existCategory === 0) {
      throw new Error('Service category not found for this tenant');
    }
  }

  private async assertCodeNotExists(code: string, tenantId: string) {
    const existsCode = await this.prisma.service.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (existsCode > 0) {
      throw new Error('Service code already exists for this tenant');
    }
  }

  private async assertCodeIsNotRepeated(
    code: string,
    tenantId: string,
    serviceId: string,
  ) {
    const existsCode = await this.prisma.service.count({
      where: {
        code,
        tenant_id: tenantId,
        removed_at: null,
        NOT: { id: serviceId },
      },
    });

    if (existsCode > 0) {
      throw new Error('Service code already exists for this tenant');
    }
  }
}
