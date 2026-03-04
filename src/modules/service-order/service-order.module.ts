import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { PrismaService } from '@core/prisma.service';
import { OrderResourceConsumptionModule } from './order-resource-consumption/order-resource-consumption.module';

@Module({
  imports: [
    OrderModule,
    OrderItemModule,
    OrderDetailsModule,
    OrderResourceConsumptionModule,
  ],
  providers: [PrismaService],
})
export class ServiceOrderModule {}
