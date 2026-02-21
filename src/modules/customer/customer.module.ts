import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from '@core/prisma.service';
import { CustomerHelperService } from './services/customer-helper.service';
import { CustomerActivationService } from './services/customer-activation.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    UtilsService,
    CustomerHelperService,
    CustomerActivationService,
  ],
  exports: [CustomerService, CustomerHelperService, CustomerActivationService],
})
export class CustomerModule {}
