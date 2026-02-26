import { Module } from '@nestjs/common';
import { MaterialResourceService } from './material-resource.service';
import { MaterialResourceController } from './material-resource.controller';

@Module({
  controllers: [MaterialResourceController],
  providers: [MaterialResourceService],
})
export class MaterialResourceModule {}
