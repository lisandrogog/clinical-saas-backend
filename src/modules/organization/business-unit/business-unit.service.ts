import { Injectable } from '@nestjs/common';
import { CreateBusinessUnitDto } from './dto/create-business-unit.dto';
import { UpdateBusinessUnitDto } from './dto/update-business-unit.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class BusinessUnitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBusinessUnitDto, userId?: string) {
    const id = uuidv7();

    return await this.prisma.business_unit.create({
      data: {
        id,
        tenant_id: dto.tenantId,
        code: dto.code,
        business_name: dto.businessName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        active: dto.active ?? true,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.business_unit.findMany({
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
    return await this.prisma.business_unit.findUnique({
      where: { id, tenant_id: tenantId, removed_at: null },
    });
  }

  async getByCode(code: string, tenantId: string) {
    return await this.prisma.business_unit.findFirst({
      where: { code, tenant_id: tenantId, removed_at: null },
    });
  }

  async update(
    id: string,
    tenantId: string,
    dto: UpdateBusinessUnitDto,
    userId?: string,
  ) {
    return await this.prisma.business_unit.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        code: dto.code,
        business_name: dto.businessName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        ...(dto.active !== undefined && { active: dto.active }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, tenantId: string, userId?: string) {
    return await this.prisma.business_unit.update({
      where: { id, tenant_id: tenantId, removed_at: null },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
