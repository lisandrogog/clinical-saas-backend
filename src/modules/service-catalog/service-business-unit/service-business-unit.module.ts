import { Module } from '@nestjs/common';
import { ServiceBusinessUnitController } from './controllers/service-business-unit.controller';
import { PrismaService } from '@core/prisma.service';
import {
  ServiceBusinessUnitService,
  ServiceBusinessUnitHelperService,
  ServiceBusinessUnitAssociationService,
} from './services';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [ServiceBusinessUnitController],
  providers: [
    ServiceBusinessUnitService,
    ServiceBusinessUnitHelperService,
    PrismaService,
    UtilsService,
    ServiceBusinessUnitAssociationService,
  ],
})
export class ServiceBusinessUnitModule {}
