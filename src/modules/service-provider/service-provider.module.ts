import { Module } from '@nestjs/common';
import { ProviderModule } from './provider/provider.module';
import { ProviderServiceModule } from './provider-service/provider-service.module';
import { ProviderScheduleModule } from './provider-schedule/provider-schedule.module';
import { PrismaService } from '@core/prisma.service';

@Module({
  imports: [ProviderModule, ProviderServiceModule, ProviderScheduleModule],
  providers: [PrismaService],
})
export class ServiceProviderModule {}
