import { Injectable } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateServiceProviderDto) {
    await this.assertPartnerExists(dto.businessPartnerId, tenantId);

    await this.assertProviderNotExistsForPartner(
      dto.businessPartnerId,
      tenantId,
    );

    const id = uuidv7();

    return await this.prisma.service_provider.create({
      data: {
        id,
        tenant_id: tenantId,
        business_partner_id: dto.businessPartnerId,
        active: dto.active ?? true,
        extra_data: dto.extraData,
        created_at: new Date(),
      },
    });
  }

  async findAll(tenantId: string) {
    return await this.prisma.service_provider.findMany({
      where: {
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_partner: true,
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.service_provider.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_partner: true,
      },
    });
  }

  async update(id: string, tenantId: string, dto: UpdateServiceProviderDto) {
    if (dto.businessPartnerId) {
      await this.assertPartnerExists(dto.businessPartnerId, tenantId);

      await this.assertProviderExistsForPartner(
        dto.businessPartnerId,
        tenantId,
      );
    }

    return await this.prisma.service_provider.update({
      where: {
        id,
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      data: {
        ...(dto.active !== undefined && { active: dto.active }),
        ...(dto.extraData && { extra_data: dto.extraData }),
        updated_at: new Date(),
      },
    });
  }

  async delete(id: string, tenantId: string) {
    return await this.prisma.service_provider.delete({
      where: {
        id,
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertPartnerExists(partnerId: string, tenantId: string) {
    const partnerExists = await this.prisma.business_partner.count({
      where: {
        id: partnerId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (!partnerExists) {
      throw new Error(
        `Partner with ID ${partnerId} does not exist for the tenant ${tenantId}`,
      );
    }
  }

  private async assertProviderNotExistsForPartner(
    partnerId: string,
    tenantId: string,
  ) {
    const providerExists = await this.prisma.service_provider.count({
      where: {
        business_partner_id: partnerId,
        tenant_id: tenantId,
      },
    });

    if (providerExists > 0) {
      throw new Error(
        `A service provider for partner ID ${partnerId} already exists for the tenant ${tenantId}`,
      );
    }
  }

  private async assertProviderExistsForPartner(
    partnerId: string,
    tenantId: string,
  ) {
    const providerExists = await this.prisma.service_provider.count({
      where: {
        business_partner_id: partnerId,
        tenant_id: tenantId,
      },
    });

    if (providerExists === 0) {
      throw new Error(
        `No service provider found for partner ID ${partnerId} and tenant ${tenantId}`,
      );
    }
  }
}
