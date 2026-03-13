import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { PrismaService } from '@core/prisma.service';
import { OrderHelperService } from './services/order-helper.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderHelperService, PrismaService, UtilsService],
})
export class OrderModule {}
