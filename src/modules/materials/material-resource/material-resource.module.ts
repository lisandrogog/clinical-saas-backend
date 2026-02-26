import { Module } from '@nestjs/common';
import {
  MaterialResourceActivationService,
  MaterialResourceHelperService,
  MaterialResourceService,
} from './services';
import { MaterialResourceController } from './controllers/material-resource.controller';
import { MaterialResourceTypeHelperService } from '@modules/materials/material-resource-type/services/material-resource-type-helper.service';
import { PrismaService } from '@core/prisma.service';
import { UtilsService } from '@modules/utils/services';

@Module({
  controllers: [MaterialResourceController],
  providers: [
    MaterialResourceService,
    MaterialResourceHelperService,
    MaterialResourceActivationService,
    MaterialResourceTypeHelperService,
    PrismaService,
    UtilsService,
  ],
})
export class MaterialResourceModule {}
