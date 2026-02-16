import { Injectable } from '@nestjs/common';
import { CreateAppUserBusinessUnitDto } from './dto/create-app-user-business-unit.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class AppUserBusinessUnitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppUserBusinessUnitDto, userId?: string) {
    return await this.prisma.app_user_business_unit.create({
      data: {
        app_user_id: dto.appUserId,
        business_unit_id: dto.businessUnitId,
        created_at: new Date(),
        created_by: userId,
      },
    });
  }

  async getUsers(tenantId: string, businessUnitId: string) {
    return await this.prisma.app_user_business_unit.findMany({
      where: {
        business_unit_id: businessUnitId,
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
        app_user: {
          removed_at: null,
          business_partner: {
            tenant_id: tenantId,
            removed_at: null,
          },
        },
      },
      include: {
        app_user: true,
      },
      orderBy: {
        app_user: {
          created_at: 'desc',
        },
      },
    });
  }

  async getUnits(tenantId: string, appUserId: string) {
    return await this.prisma.app_user_business_unit.findMany({
      where: {
        app_user_id: appUserId,
        app_user: {
          removed_at: null,
          business_partner: {
            tenant_id: tenantId,
            removed_at: null,
          },
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
    return await this.prisma.app_user_business_unit.findUnique({
      where: {
        id,
        app_user: {
          removed_at: null,
          business_partner: {
            tenant_id: tenantId,
            removed_at: null,
          },
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
      include: {
        app_user: true,
        business_unit: true,
      },
    });
  }

  async remove(id: string, tenantId: string) {
    return await this.prisma.app_user_business_unit.delete({
      where: {
        id,
        app_user: {
          removed_at: null,
          business_partner: {
            tenant_id: tenantId,
            removed_at: null,
          },
        },
        business_unit: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });
  }
}
