import { Module } from '@nestjs/common';
import { ProviderController } from './controllers/provider.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';
import {
  ProviderService,
  ProviderHelperService,
  ProviderActivationService,
} from './services';

@Module({
  controllers: [ProviderController],
  providers: [
    ProviderService,
    PrismaService,
    UtilsService,
    ProviderHelperService,
    ProviderActivationService,
  ],
})
export class ProviderModule {}
