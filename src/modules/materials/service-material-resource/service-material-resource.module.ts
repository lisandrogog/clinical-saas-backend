import { Module } from '@nestjs/common';
import { ServiceMaterialResourceService } from './service-material-resource.service';
import { ServiceMaterialResourceController } from './service-material-resource.controller';

@Module({
  controllers: [ServiceMaterialResourceController],
  providers: [ServiceMaterialResourceService],
})
export class ServiceMaterialResourceModule {}
