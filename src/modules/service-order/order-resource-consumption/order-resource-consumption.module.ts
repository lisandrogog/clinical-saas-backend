import { Module } from '@nestjs/common';
import { OrderResourceConsumptionService } from './order-resource-consumption.service';
import { OrderResourceConsumptionController } from './controllers/order-resource-consumption.controller';

@Module({
  controllers: [OrderResourceConsumptionController],
  providers: [OrderResourceConsumptionService],
})
export class OrderResourceConsumptionModule {}
