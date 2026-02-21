import { Injectable } from '@nestjs/common';
import { CreateBusinessPartnerDto } from './dto/create-business-partner.dto';
import { UpdateBusinessPartnerDto } from './dto/update-business-partner.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class BusinessPartnerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBusinessPartnerDto, userId?: string) {
    const id = uuidv7();

    return await this.prisma.business_partner.create({
      data: {
        id,
        tenant_id: dto.tenantId,
        identification_type_id: dto.identificationTypeId,
        identification_number: dto.identificationNumber,
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        active: dto.active ?? true,
        extra_data: dto.extraData,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.business_partner.findMany({
      where: {
        tenant_id: tenantId,
        removed_at: null,
      },
      orderBy: [
        {
          first_name: 'asc',
        },
        {
          last_name: 'asc',
        },
      ],
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.business_partner.findUnique({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
      },
    });
  }

  async getByIdentification(
    tenantId: string,
    identificationTypeId: number,
    identificationNumber: string,
  ) {
    return await this.prisma.business_partner.findFirst({
      where: {
        tenant_id: tenantId,
        identification_number: identificationNumber,
        identification_type_id: identificationTypeId,
        removed_at: null,
      },
    });
  }

  async update(
    id: string,
    tenantId: string,
    dto: UpdateBusinessPartnerDto,
    userId?: string,
  ) {
    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        readonly: false,
      },
      data: {
        identification_type_id: dto.identificationTypeId,
        identification_number: dto.identificationNumber,
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        ...(dto.active !== undefined && { active: dto.active }),
        extra_data: dto.extraData,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async remove(id: string, tenantId: string, userId?: string) {
    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        readonly: false,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
