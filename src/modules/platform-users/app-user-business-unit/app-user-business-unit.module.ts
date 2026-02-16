import { Module } from '@nestjs/common';
import { AppUserBusinessUnitService } from './app-user-business-unit.service';
import { AppUserBusinessUnitController } from './app-user-business-unit.controller';

@Module({
  controllers: [AppUserBusinessUnitController],
  providers: [AppUserBusinessUnitService],
})
export class AppUserBusinessUnitModule {}
