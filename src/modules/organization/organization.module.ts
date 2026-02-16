import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { BusinessUnitModule } from './business-unit/business-unit.module';
import { BusinessPartnerModule } from './business-partner/business-partner.module';
import { IdentificationTypeModule } from './identification-type/identification-type.module';
import { BusinessPartnerBusinessUnitModule } from './business-partner-business-unit/business-partner-business-unit.module';

@Module({
  imports: [
    TenantModule,
    BusinessUnitModule,
    BusinessPartnerModule,
    IdentificationTypeModule,
    BusinessPartnerBusinessUnitModule,
  ],
})
export class OrganizationModule {}
