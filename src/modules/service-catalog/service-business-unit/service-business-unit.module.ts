import { Module } from '@nestjs/common';
import { ServiceBusinessUnitService } from './service-business-unit.service';
import { ServiceBusinessUnitController } from './service-business-unit.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [ServiceBusinessUnitController],
  providers: [ServiceBusinessUnitService, PrismaService],
})
export class ServiceBusinessUnitModule {}
