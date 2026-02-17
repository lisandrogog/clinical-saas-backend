import { Module } from '@nestjs/common';
import { ProviderScheduleService } from './provider-schedule.service';
import { ProviderScheduleController } from './provider-schedule.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services/utils.service';

@Module({
  controllers: [ProviderScheduleController],
  providers: [ProviderScheduleService, PrismaService, UtilsService],
})
export class ProviderScheduleModule {}
