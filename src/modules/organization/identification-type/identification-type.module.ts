import { Module } from '@nestjs/common';
import { IdentificationTypeService } from './identification-type.service';
import { IdentificationTypeController } from './identification-type.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [IdentificationTypeController],
  providers: [IdentificationTypeService, PrismaService],
})
export class IdentificationTypeModule {}
