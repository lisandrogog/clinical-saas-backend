import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { UtilsService } from '@modules/utils/services/utils.service';
import {
  CreateServiceProviderScheduleDto,
  CreateScheduleDayBlockDto,
} from '@shared-common';
import { ProviderScheduleHelperService } from './provider-schedule-helper.service';

@Injectable()
export class ProviderScheduleService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
    private providerScheduleHelperService: ProviderScheduleHelperService,
  ) {}

  async upsert(
    tenantId: string,
    businessUnitId: string,
    payload: CreateServiceProviderScheduleDto,
  ) {
    await this.providerScheduleHelperService.assertServiceProviderExists(
      payload.serviceProviderId,
      tenantId,
    );

    if (payload.scheduleDayBklocks.length === 0) {
      throw new BadRequestException('At least one schedule block is required');
    }

    this.providerScheduleHelperService.assertValidSheduleBlocks(
      payload.scheduleDayBklocks,
    );

    await this.providerScheduleHelperService.removeExistingScheduleBlocks(
      payload.serviceProviderId,
      tenantId,
      businessUnitId,
    );

    const now = new Date();

    const createData: any[] = payload.scheduleDayBklocks.map(
      (block: CreateScheduleDayBlockDto) => ({
        id: uuidv7(),
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        service_provider_id: payload.serviceProviderId,
        day_of_week: block.dayOfWeek,
        start_time: block.startTime,
        end_time: block.endTime,
        slot_duration_minutes: block.slotDurationMinutes || 60,
        active: block.active ?? true,
        created_at: now,
      }),
    );

    return await this.prisma.service_provider_schedule.createMany({
      data: createData,
    });
  }

  async findByUnit(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId: string,
  ) {
    await this.providerScheduleHelperService.assertServiceProviderExists(
      serviceProviderId,
      tenantId,
    );

    return await this.prisma.service_provider_schedule.findMany({
      where: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        service_provider_id: serviceProviderId,
      },
      orderBy: [{ day_of_week: 'asc' }, { start_time: 'asc' }],
    });
  }

  async delete(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId: string,
  ) {
    await this.providerScheduleHelperService.assertServiceProviderExists(
      serviceProviderId,
      tenantId,
    );

    await this.providerScheduleHelperService.removeExistingScheduleBlocks(
      serviceProviderId,
      tenantId,
      businessUnitId,
    );
  }
}
