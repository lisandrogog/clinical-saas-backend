import { Module } from '@nestjs/common';
import { BusinessUnitMaterialResourceController } from './controllers/business-unit-material-resource.controller';
import {
  BusinessUnitMaterialResourceHelperService,
  BusinessUnitMaterialResourceService,
} from './services';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [BusinessUnitMaterialResourceController],
  providers: [
    BusinessUnitMaterialResourceService,
    BusinessUnitMaterialResourceHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class BusinessUnitMaterialResourceModule {}
