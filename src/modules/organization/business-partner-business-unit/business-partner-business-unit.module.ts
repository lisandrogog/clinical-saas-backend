import { Module } from '@nestjs/common';
import { BusinessPartnerBusinessUnitService } from './business-partner-business-unit.service';
import { BusinessPartnerBusinessUnitController } from './business-partner-business-unit.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [BusinessPartnerBusinessUnitController],
  providers: [BusinessPartnerBusinessUnitService, PrismaService],
})
export class BusinessPartnerBusinessUnitModule {}
