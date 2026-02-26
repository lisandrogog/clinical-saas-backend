import { Module } from '@nestjs/common';
import { BusinessUnitMaterialResourceService } from './business-unit-material-resource.service';
import { BusinessUnitMaterialResourceController } from './business-unit-material-resource.controller';

@Module({
  controllers: [BusinessUnitMaterialResourceController],
  providers: [BusinessUnitMaterialResourceService],
})
export class BusinessUnitMaterialResourceModule {}
