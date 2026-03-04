import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { BusinessUnitRoomHelperService } from './business-unit-room-helper.service';

@Injectable()
export class BusinessUnitRoomActivationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: BusinessUnitRoomHelperService,
  ) {}

  async disable(
    tenantId: string,
    businessUnitId: string,
    id: string,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
      true,
    );

    return await this.prisma.business_unit_room.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
        active: true,
        readonly: false,
      },
      data: {
        active: false,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async enable(
    tenantId: string,
    businessUnitId: string,
    id: string,
    userId?: string,
  ) {
    await this.helper.assertBusinessUnitRoomExistsInTenant(
      tenantId,
      businessUnitId,
      id,
      true,
    );

    return await this.prisma.business_unit_room.update({
      where: {
        id,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        removed_at: null,
        active: false,
        readonly: false,
      },
      data: {
        active: true,
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }
}
