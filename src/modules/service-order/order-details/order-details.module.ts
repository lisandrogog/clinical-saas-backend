import { Module } from '@nestjs/common';
import { OrderDetailsController } from './controllers/order-details.controller';
import { OrderDetailsService, OrderDetailsHelperService } from './services';
import { PrismaService } from '@core/prisma.service';
import { UtilsModule } from '@modules/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, OrderDetailsHelperService, PrismaService],
})
export class OrderDetailsModule {}
