import { Module } from '@nestjs/common';
import { MaterialResourceTypeController } from './controllers/material-resource-type.controller';
import {
  MaterialResourceTypeService,
  MaterialResourceTypeHelperService,
} from './services';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [MaterialResourceTypeController],
  providers: [
    MaterialResourceTypeService,
    MaterialResourceTypeHelperService,
    PrismaService,
  ],
})
export class MaterialResourceTypeModule {}
