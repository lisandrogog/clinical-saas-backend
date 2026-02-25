import { Module } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { ProviderServiceController } from './controllers/provider-service.controller';
import {
  ProviderServiceHelperService,
  ProviderServiceService,
} from './services';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [ProviderServiceController],
  providers: [
    ProviderServiceService,
    ProviderServiceHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class ProviderServiceModule {}
