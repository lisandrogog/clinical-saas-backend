import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@Module({
  imports: [OrderModule, OrderItemModule, OrderDetailsModule],
})
export class ServiceOrderModule {}
