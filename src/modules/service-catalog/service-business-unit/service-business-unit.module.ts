import { Module } from '@nestjs/common';
import { ServiceBusinessUnitService } from './service-business-unit.service';
import { ServiceBusinessUnitController } from './service-business-unit.controller';

@Module({
  controllers: [ServiceBusinessUnitController],
  providers: [ServiceBusinessUnitService],
})
export class ServiceBusinessUnitModule {}
