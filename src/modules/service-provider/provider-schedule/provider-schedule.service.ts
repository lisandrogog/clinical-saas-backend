import { Injectable } from '@nestjs/common';
import { CreateServiceProviderScheduleDto } from './dto/create-service-provider-schedule.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { UtilsService } from '@modules/utils/services/utils.service';
import { CreateScheduleDayBlockDto } from './dto/create-schedule-day-block.dto';

@Injectable()
export class ProviderScheduleService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async upsert(
    tenantId: string,
    businessUnitId: string,
    dto: CreateServiceProviderScheduleDto,
  ) {
    await this.assertServiceProviderExists(dto.serviceProviderId, tenantId);

    if (dto.scheduleDayBklocks.length === 0) {
      throw new Error('At least one schedule block is required');
    }

    this.assertValidSheduleBlocks(dto.scheduleDayBklocks);

    await this.removeExistingScheduleBlocks(
      dto.serviceProviderId,
      tenantId,
      businessUnitId,
    );

    const now = new Date();

    const createData: any[] = dto.scheduleDayBklocks.map(
      (block: CreateScheduleDayBlockDto) => ({
        id: uuidv7(),
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        service_provider_id: dto.serviceProviderId,
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
    await this.assertServiceProviderExists(serviceProviderId, tenantId);

    return await this.prisma.service_provider_schedule.findMany({
      where: {
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
        service_provider_id: serviceProviderId,
      },
      orderBy: {
        day_of_week: 'asc',
        start_time: 'asc',
      },
    });
  }

  async delete(
    tenantId: string,
    businessUnitId: string,
    serviceProviderId: string,
  ) {
    await this.assertServiceProviderExists(serviceProviderId, tenantId);

    await this.removeExistingScheduleBlocks(
      serviceProviderId,
      tenantId,
      businessUnitId,
    );
  }

  // ******************************************************************************
  // Helpers
  // ******************************************************************************
  private async assertServiceProviderExists(
    serviceProviderId: string,
    tenantId: string,
  ) {
    const providerExists = await this.prisma.service_provider.count({
      where: {
        id: serviceProviderId,
        tenant_id: tenantId,
        business_partner: {
          tenant_id: tenantId,
          removed_at: null,
        },
      },
    });

    if (providerExists === 0) {
      throw new Error('Service provider does not exist for this tenant');
    }
  }

  private assertValidSheduleBlocks(blocks: CreateScheduleDayBlockDto[]) {
    for (const block of blocks) {
      if (block.dayOfWeek < 0 || block.dayOfWeek > 6) {
        throw new Error(
          'dayOfWeek must be between 0 (Sunday) and 6 (Saturday)',
        );
      }

      if (!this.utilsService.isValidTime(block.startTime)) {
        throw new Error(
          `Invalid startTime format for dayOfWeek ${block.dayOfWeek}. Expected HH:mm`,
        );
      }

      if (!this.utilsService.isValidTime(block.endTime)) {
        throw new Error(
          `Invalid endTime format for dayOfWeek ${block.dayOfWeek}. Expected HH:mm`,
        );
      }

      if (
        this.utilsService.toMinutes(block.startTime) >=
        this.utilsService.toMinutes(block.endTime)
      ) {
        throw new Error(
          `startTime must be before endTime for dayOfWeek ${block.dayOfWeek}`,
        );
      }
    }
  }

  private async removeExistingScheduleBlocks(
    serviceProviderId: string,
    tenantId: string,
    businessUnitId: string,
  ) {
    await this.prisma.service_provider_schedule.deleteMany({
      where: {
        service_provider_id: serviceProviderId,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
      },
    });
  }
}
