import { Module } from '@nestjs/common';
import { PermissionTypeService } from './permission-type.service';
import { PermissionTypeController } from './permission-type.controller';

@Module({
  controllers: [PermissionTypeController],
  providers: [PermissionTypeService],
})
export class PermissionTypeModule {}
