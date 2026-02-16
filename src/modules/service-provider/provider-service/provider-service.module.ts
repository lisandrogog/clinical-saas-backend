import { Module } from '@nestjs/common';
import { ProviderServiceService } from './provider-service.service';
import { ProviderServiceController } from './provider-service.controller';

@Module({
  controllers: [ProviderServiceController],
  providers: [ProviderServiceService],
})
export class ProviderServiceModule {}
