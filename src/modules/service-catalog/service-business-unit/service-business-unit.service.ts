import { Injectable } from '@nestjs/common';
import { CreateServiceBusinessUnitDto } from './dto/create-service-business-unit.dto';
import { UpdateServiceBusinessUnitDto } from './dto/update-service-business-unit.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class ServiceBusinessUnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenantId: string,
    dto: CreateServiceBusinessUnitDto,
    userId?: string,
  ) {
    await this.assertUnitExists(dto.businessUnitId, tenantId);

    await this.assertServiceExists(dto.serviceId, tenantId);

    await this.assertAssociationNotExists(
      dto.serviceId,
      dto.businessUnitId,
      tenantId,
    );

    return await this.prisma.service_business_unit.create({
      data: {
        service_id: dto.serviceId,
        business_unit_id: dto.businessUnitId,
        price: dto.price,
        cost: dto.cost,
        ...(dto.active !== undefined && { active: dto.active }),
        extra_data: dto.extraData,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async getServices(businessUnitId: string, tenantId: string) {
    await this.assertUnitExists(businessUnitId, tenantId);

    return await this.prisma.service_business_unit.findMany({
      where: {
        business_unit_id: businessUnitId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        service: true,
      },
    });
  }

  async getUnits(serviceId: string, tenantId: string) {
    await this.assertServiceExists(serviceId, tenantId);

    return await this.prisma.service_business_unit.findMany({
      where: {
        service_id: serviceId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        business_unit: true,
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    return await this.prisma.service_business_unit.findFirst({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        service: true,
        business_unit: true,
      },
    });
  }

  async update(
    id: string,
    tenantId: string,
    dto: UpdateServiceBusinessUnitDto,
    userId?: string,
  ) {
    return await this.prisma.service_business_unit.update({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      data: {
        price: dto.price,
        cost: dto.cost,
        ...(dto.active !== undefined && { active: dto.active }),
        ...(dto.extraData && { extra_data: dto.extraData }),
        updated_at: new Date(),
        updated_by: userId,
      },
    });
  }

  async delete(id: string, tenantId: string) {
    return await this.prisma.service_business_unit.delete({
      where: {
        id,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }

  // ******************************************************************************
  // Helpers
  // ******************************************************************************

  private async assertUnitExists(businessUnitId: string, tenantId: string) {
    const unitExists = await this.prisma.business_unit.count({
      where: {
        id: businessUnitId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (unitExists === 0) {
      throw new Error('Business unit not found for this tenant');
    }
  }

  private async assertServiceExists(serviceId: string, tenantId: string) {
    const serviceExists = await this.prisma.service.count({
      where: {
        id: serviceId,
        tenant_id: tenantId,
        removed_at: null,
      },
    });

    if (serviceExists === 0) {
      throw new Error('Service not found for this tenant');
    }
  }

  private async assertAssociationNotExists(
    serviceId: string,
    businessUnitId: string,
    tenantId: string,
  ) {
    const associationExists = await this.prisma.service_business_unit.count({
      where: {
        service_id: serviceId,
        service: {
          tenant_id: tenantId,
          removed_at: null,
        },
        business_unit_id: businessUnitId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (associationExists > 0) {
      throw new Error(
        'This service is already associated with this business unit for this tenant',
      );
    }
  }
}
