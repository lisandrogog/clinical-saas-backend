import { Module } from '@nestjs/common';
import { BusinessPartnerBusinessUnitService } from './business-partner-business-unit.service';
import { BusinessPartnerBusinessUnitController } from './business-partner-business-unit.controller';

@Module({
  controllers: [BusinessPartnerBusinessUnitController],
  providers: [BusinessPartnerBusinessUnitService],
})
export class BusinessPartnerBusinessUnitModule {}
