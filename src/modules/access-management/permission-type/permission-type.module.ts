import { Module } from '@nestjs/common';
import { PermissionTypeService } from './permission-type.service';
import { PermissionTypeController } from './permission-type.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [PermissionTypeController],
  providers: [PermissionTypeService, PrismaService],
})
export class PermissionTypeModule {}
