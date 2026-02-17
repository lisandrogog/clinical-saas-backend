import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitController } from './business-unit.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService, PrismaService],
})
export class BusinessUnitModule {}
