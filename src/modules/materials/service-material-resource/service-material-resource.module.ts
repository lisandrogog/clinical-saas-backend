import { Module } from '@nestjs/common';
import { ServiceMaterialResourceService } from './services/service-material-resource.service';
import { ServiceMaterialResourceHelperService } from './services/service-material-resource-helper.service';
import { ServiceMaterialResourceController } from './controllers/service-material-resource.controller';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [ServiceMaterialResourceController],
  providers: [
    ServiceMaterialResourceService,
    ServiceMaterialResourceHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class ServiceMaterialResourceModule {}
