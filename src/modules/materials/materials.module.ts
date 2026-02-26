import { Module } from '@nestjs/common';
import { MaterialResourceTypeModule } from './material-resource-type/material-resource-type.module';
import { MaterialResourceModule } from './material-resource/material-resource.module';
import { ServiceMaterialResourceModule } from './service-material-resource/service-material-resource.module';
import { BusinessUnitMaterialResourceModule } from './business-unit-material-resource/business-unit-material-resource.module';

@Module({
  imports: [
    MaterialResourceTypeModule,
    MaterialResourceModule,
    ServiceMaterialResourceModule,
    BusinessUnitMaterialResourceModule,
  ],
})
export class MaterialsModule {}
