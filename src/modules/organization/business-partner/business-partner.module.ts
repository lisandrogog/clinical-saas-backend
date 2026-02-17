import { Module } from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartnerController } from './business-partner.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [BusinessPartnerController],
  providers: [BusinessPartnerService, PrismaService],
})
export class BusinessPartnerModule {}
