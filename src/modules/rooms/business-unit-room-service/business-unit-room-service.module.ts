import { Module } from '@nestjs/common';
import { BusinessUnitRoomServiceService } from './services/business-unit-room-service.service';
import { BusinessUnitRoomServiceController } from './controllers/business-unit-room-service.controller';
import { BusinessUnitRoomServiceHelperService } from './services/business-unit-room-service-helper.service';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [BusinessUnitRoomServiceController],
  providers: [
    BusinessUnitRoomServiceService,
    BusinessUnitRoomServiceHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class BusinessUnitRoomServiceModule {}
