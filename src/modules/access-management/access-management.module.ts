import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AccessScopeModule } from './access-scope/access-scope.module';
import { PermissionTypeModule } from './permission-type/permission-type.module';
import { PermissionModule } from './permission/permission.module';
import { PrismaService } from '@core/prisma.service';

@Module({
  imports: [
    RoleModule,
    AccessScopeModule,
    PermissionTypeModule,
    PermissionModule,
  ],
  providers: [PrismaService],
})
export class AccessManagementModule {}
