import { Injectable } from '@nestjs/common';
import { CreateBusinessPartnerBusinessUnitDto } from './dto/create-business-partner-business-unit.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class BusinessPartnerBusinessUnitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBusinessPartnerBusinessUnitDto) {
    const id = uuidv7();

    return await this.prisma.business_partner_business_unit.create({
      data: {
        id,
        business_unit_id: dto.businessUnitId,
        business_partner_id: dto.businessPartnerId,
        created_at: new Date(),
      },
    });
  }

  async getPartners(tenantId: string, businessUnitId: string) {
    return await this.prisma.business_partner_business_unit.findMany({
      where: {
        business_unit_id: businessUnitId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_partner: true,
      },
      orderBy: {
        business_partner: {
          first_name: 'asc',
          last_name: 'asc',
        },
      },
    });
  }

  async getUnits(tenantId: string, businessPartnerId: string) {
    return await this.prisma.business_partner_business_unit.findMany({
      where: {
        business_partner_id: businessPartnerId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_unit: true,
      },
      orderBy: {
        business_unit: {
          code: 'asc',
        },
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.business_partner_business_unit.findUnique({
      where: {
        id,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_partner: true,
        business_unit: true,
      },
    });
  }

  async delete(id: string, tenantId: string) {
    return await this.prisma.business_partner_business_unit.delete({
      where: {
        id,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }
}
