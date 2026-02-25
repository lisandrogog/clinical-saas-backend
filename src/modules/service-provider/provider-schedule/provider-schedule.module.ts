import { Module } from '@nestjs/common';
import { ProviderScheduleService } from './services/provider-schedule.service';
import { ProviderScheduleController } from './controllers/provider-schedule.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services/utils.service';

@Module({
  controllers: [ProviderScheduleController],
  providers: [ProviderScheduleService, PrismaService, UtilsService],
})
export class ProviderScheduleModule {}
