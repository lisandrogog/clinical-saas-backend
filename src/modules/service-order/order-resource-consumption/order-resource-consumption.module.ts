import { Module } from '@nestjs/common';
import { OrderResourceConsumptionController } from './controllers/order-resource-consumption.controller';
import {
  OrderResourceConsumptionService,
  OrderResourceConsumptionHelperService,
} from './services';
import { PrismaService } from '@core/prisma.service';
import { UtilsModule } from '@modules/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [OrderResourceConsumptionController],
  providers: [
    OrderResourceConsumptionService,
    OrderResourceConsumptionHelperService,
    PrismaService,
  ],
})
export class OrderResourceConsumptionModule {}
