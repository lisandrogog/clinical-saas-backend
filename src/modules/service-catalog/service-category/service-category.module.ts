import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './services/service-category.service';
import { ServiceCategoryController } from './controllers/service-category.controller';
import { PrismaService } from '@core/prisma.service';
import { ServiceCategoryHelperService } from './services/service-category-helper.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [ServiceCategoryController],
  providers: [
    ServiceCategoryService,
    PrismaService,
    UtilsService,
    ServiceCategoryHelperService,
  ],
  exports: [ServiceCategoryService, ServiceCategoryHelperService],
})
export class ServiceCategoryModule {}
