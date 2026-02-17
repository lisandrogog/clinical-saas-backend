import { Module } from '@nestjs/common';
import { ProviderServiceService } from './provider-service.service';
import { ProviderServiceController } from './provider-service.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [ProviderServiceController],
  providers: [ProviderServiceService, PrismaService],
})
export class ProviderServiceModule {}
