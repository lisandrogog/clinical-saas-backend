import { Module } from '@nestjs/common';
import { ProviderScheduleController } from './controllers/provider-schedule.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services/utils.service';
import {
  ProviderScheduleHelperService,
  ProviderScheduleService,
} from './services';

@Module({
  controllers: [ProviderScheduleController],
  providers: [
    ProviderScheduleService,
    ProviderScheduleHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class ProviderScheduleModule {}
