import { Module } from '@nestjs/common';
import { OrderResourceConsumptionController } from './controllers/order-resource-consumption.controller';
import { OrderResourceConsumptionService } from './services/order-resource-consumption.service';

@Module({
  controllers: [OrderResourceConsumptionController],
  providers: [OrderResourceConsumptionService],
})
export class OrderResourceConsumptionModule {}
