import { Module } from '@nestjs/common';
import { BusinessUnitRoomMaterialService } from './services/business-unit-room-material.service';
import { BusinessUnitRoomMaterialController } from './controllers/business-unit-room-material.controller';
import { BusinessUnitRoomMaterialHelperService } from './services/business-unit-room-material-helper.service';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [BusinessUnitRoomMaterialController],
  providers: [
    BusinessUnitRoomMaterialService,
    BusinessUnitRoomMaterialHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class BusinessUnitRoomMaterialModule {}
