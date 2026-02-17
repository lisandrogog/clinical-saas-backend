import { Module } from '@nestjs/common';
import { AppUserBusinessUnitService } from './app-user-business-unit.service';
import { AppUserBusinessUnitController } from './app-user-business-unit.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [AppUserBusinessUnitController],
  providers: [AppUserBusinessUnitService, PrismaService],
})
export class AppUserBusinessUnitModule {}
