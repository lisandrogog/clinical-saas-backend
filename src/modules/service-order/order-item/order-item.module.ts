import { Module } from '@nestjs/common';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService, OrderItemHelperService } from './services';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemHelperService, PrismaService],
})
export class OrderItemModule {}
