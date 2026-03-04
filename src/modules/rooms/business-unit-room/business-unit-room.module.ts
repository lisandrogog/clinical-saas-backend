import { Module } from '@nestjs/common';
import { BusinessUnitRoomController } from './controllers/business-unit-room.controller';
import {
  BusinessUnitRoomService,
  BusinessUnitRoomActivationService,
  BusinessUnitRoomHelperService,
} from './services';
import { UtilsService } from '@modules/utils/services';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [BusinessUnitRoomController],
  providers: [
    BusinessUnitRoomService,
    BusinessUnitRoomActivationService,
    BusinessUnitRoomHelperService,
    UtilsService,
    PrismaService,
  ],
})
export class BusinessUnitRoomModule {}
