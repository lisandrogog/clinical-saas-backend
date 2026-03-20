import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessPartnerBusinessUnitService } from './business-partner-business-unit.service';
import { CreateBusinessPartnerBusinessUnitDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessUnitId, TenantId } from '@modules/utils/decorators';

@ApiTags('business-partner-business-unit')
@Controller('business-partner-business-unit')
export class BusinessPartnerBusinessUnitController {
  constructor(
    private readonly businessPartnerBusinessUnitService: BusinessPartnerBusinessUnitService,
  ) {}

  @Post()
  async create(
    @Body()
    createBusinessPartnerBusinessUnitDto: CreateBusinessPartnerBusinessUnitDto,
  ) {
    return await this.businessPartnerBusinessUnitService.create(
      createBusinessPartnerBusinessUnitDto,
    );
  }

  @Get('partners')
  async getPartners(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.getPartners(
      tenantId,
      businessUnitId,
    );
  }

  @Get('units')
  async getUnits(
    @TenantId() tenantId: string,
    @Headers('business-partner-id') businessPartnerId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.getUnits(
      tenantId,
      businessPartnerId,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.businessPartnerBusinessUnitService.findOne(id, tenantId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.businessPartnerBusinessUnitService.delete(id, tenantId);
  }
}
