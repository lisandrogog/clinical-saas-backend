import { Module } from '@nestjs/common';
import { PermissionTypeService } from './permission-type.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [PermissionTypeService, PrismaService],
})
export class PermissionTypeModule {}
