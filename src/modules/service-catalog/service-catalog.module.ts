import { Module } from '@nestjs/common';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceModule } from './service/service.module';
import { ServiceBusinessUnitModule } from './service-business-unit/service-business-unit.module';
import { PrismaService } from '@core/prisma.service';

@Module({
  imports: [ServiceCategoryModule, ServiceModule, ServiceBusinessUnitModule],
  providers: [PrismaService],
})
export class ServiceCatalogModule {}
