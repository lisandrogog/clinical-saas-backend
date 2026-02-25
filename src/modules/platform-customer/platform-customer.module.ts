import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  imports: [CustomerModule],
  providers: [PrismaService, UtilsService],
})
export class PlatformCustomerModule {}
