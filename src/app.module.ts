import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma.service';
import { ServiceCatalogModule } from './modules/service-catalog/service-catalog.module';
import { HashService } from '@modules/utils/services/hash.service';
import { UtilsService } from '@modules/utils/services';
import { PlatformCustomerModule } from './modules/platform-customer/platform-customer.module';

@Module({
  imports: [PlatformCustomerModule, ServiceCatalogModule],
  providers: [AppService, PrismaService, HashService, UtilsService],
})
export class AppModule {}
