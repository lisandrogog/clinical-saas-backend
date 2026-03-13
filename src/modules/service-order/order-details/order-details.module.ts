import { Module } from '@nestjs/common';
import { OrderDetailsService } from './services/order-details.service';
import { OrderDetailsController } from './controllers/order-details.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, PrismaService, UtilsService],
})
export class OrderDetailsModule {}
