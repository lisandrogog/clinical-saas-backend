import { Module } from '@nestjs/common';
import { BusinessUnitRoomModule } from './business-unit-room/business-unit-room.module';
import { BusinessUnitRoomServiceModule } from './business-unit-room-service/business-unit-room-service.module';
import { BusinessUnitRoomMaterialModule } from './business-unit-room-material/business-unit-room-material.module';

@Module({
  imports: [
    BusinessUnitRoomModule,
    BusinessUnitRoomServiceModule,
    BusinessUnitRoomMaterialModule,
  ],
})
export class RoomsModule {}
