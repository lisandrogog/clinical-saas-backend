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
import { CreateBusinessPartnerBusinessUnitDto } from './dto/create-business-partner-business-unit.dto';
import { ApiTags } from '@nestjs/swagger';

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
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.getPartners(
      tenantId,
      businessUnitId,
    );
  }

  @Get('units')
  async getUnits(
    @Headers('tenant-id') tenantId: string,
    @Headers('business-partner-id') businessPartnerId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.getUnits(
      tenantId,
      businessPartnerId,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.findOne(id, tenantId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.businessPartnerBusinessUnitService.delete(id, tenantId);
  }
}
