import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services/utils.service';
import { CreateScheduleDayBlockDto } from '../dto';

@Injectable()
export class ProviderScheduleHelperService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async assertServiceProviderExists(
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
      throw new NotFoundException(
        'Service provider does not exist for this tenant',
      );
    }
  }

  assertValidSheduleBlocks(blocks: CreateScheduleDayBlockDto[]) {
    for (const block of blocks) {
      if (block.dayOfWeek < 0 || block.dayOfWeek > 6) {
        throw new BadRequestException(
          'dayOfWeek must be between 0 (Sunday) and 6 (Saturday)',
        );
      }

      if (!this.utilsService.isValidTime(block.startTime)) {
        throw new BadRequestException(
          `Invalid startTime format for dayOfWeek ${block.dayOfWeek}. Expected HH:mm`,
        );
      }

      if (!this.utilsService.isValidTime(block.endTime)) {
        throw new BadRequestException(
          `Invalid endTime format for dayOfWeek ${block.dayOfWeek}. Expected HH:mm`,
        );
      }

      if (
        this.utilsService.toMinutes(block.startTime) >=
        this.utilsService.toMinutes(block.endTime)
      ) {
        throw new BadRequestException(
          `startTime must be before endTime for dayOfWeek ${block.dayOfWeek}`,
        );
      }
    }
  }

  async removeExistingScheduleBlocks(
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
