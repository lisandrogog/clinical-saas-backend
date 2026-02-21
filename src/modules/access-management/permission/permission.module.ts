import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [PermissionService, PrismaService],
})
export class PermissionModule {}
