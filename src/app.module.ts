import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma.service';
import { OrganizationModule } from './modules/organization/organization.module';
import { ServiceCatalogModule } from './modules/service-catalog/service-catalog.module';
import { ServiceProviderModule } from './modules/service-provider/service-provider.module';
import { DocumentEngineCommonModule } from './modules/document-engine-common/document-engine-common.module';
import { DocumentWorkflowModule } from './modules/document-workflow/document-workflow.module';
import { ServiceOrderModule } from './modules/service-order/service-order.module';
import { PlatformCatalogModule } from './modules/platform-catalog/platform-catalog.module';
import { AccessManagementModule } from './modules/access-management/access-management.module';
import { PlatformUsersModule } from './modules/platform-users/platform-users.module';
import { AppUserStatusModule } from './modules/platform-users/app-user-status/app-user-status.module';
import { AppUserModule } from './modules/platform-users/app-user/app-user.module';
import { AppUserBusinessUnitModule } from './modules/platform-users/app-user-business-unit/app-user-business-unit.module';
import { UtilsModule } from '@modules/utils/utils.module';
import { HashService } from '@modules/utils/services/hash.service';

@Module({
  imports: [
    PrismaService,
    OrganizationModule,
    ServiceCatalogModule,
    ServiceProviderModule,
    DocumentEngineCommonModule,
    DocumentWorkflowModule,
    ServiceOrderModule,
    PlatformCatalogModule,
    AccessManagementModule,
    PlatformUsersModule,
    AppUserStatusModule,
    AppUserModule,
    AppUserBusinessUnitModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, HashService],
})
export class AppModule {}
