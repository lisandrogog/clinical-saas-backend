import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTenantDto, userId?: string) {
    const id = uuidv7();

    return await this.prisma.tenant.create({
      data: {
        id,
        identification_type_id: dto.identificationTypeId,
        identification_number: dto.identificationNumber,
        code: dto.code,
        business_name: dto.businessName,
        email: dto.email,
        phone: dto.phone,
        active: dto.active ?? true,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.tenant.findMany({
      orderBy: {
        code: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.tenant.findUnique({
      where: { code },
    });
  }

  async getByIdentification(
    identificationTypeId: number,
    identificationNumber: string,
  ) {
    return await this.prisma.tenant.findUnique({
      where: {
        identification_number_identification_type_id: {
          identification_type_id: identificationTypeId,
          identification_number: identificationNumber,
        },
      },
    });
  }

  async update(id: string, dto: UpdateTenantDto, userId?: string) {
    return await this.prisma.tenant.update({
      where: { id, readonly: false },
      data: {
        identification_type_id: dto.identificationTypeId,
        identification_number: dto.identificationNumber,
        code: dto.code,
        business_name: dto.businessName,
        email: dto.email,
        phone: dto.phone,
        ...(dto.active !== undefined && { active: dto.active }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }
}
