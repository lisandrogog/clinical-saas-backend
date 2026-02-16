import { Module } from '@nestjs/common';
import { IdentificationTypeService } from './identification-type.service';
import { IdentificationTypeController } from './identification-type.controller';

@Module({
  controllers: [IdentificationTypeController],
  providers: [IdentificationTypeService],
})
export class IdentificationTypeModule {}
