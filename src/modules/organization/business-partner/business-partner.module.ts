import { Module } from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartnerController } from './business-partner.controller';

@Module({
  controllers: [BusinessPartnerController],
  providers: [BusinessPartnerService],
})
export class BusinessPartnerModule {}
