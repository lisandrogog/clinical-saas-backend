import { Module } from '@nestjs/common';
import { ServiceController } from './controllers/service.controller';
import { PrismaService } from '@core/prisma.service';
import {
  ServiceService,
  ServiceActivationService,
  ServiceHelperService,
} from './services';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [ServiceController],
  providers: [
    ServiceService,
    ServiceActivationService,
    PrismaService,
    UtilsService,
    ServiceHelperService,
  ],
})
export class ServiceModule {}
