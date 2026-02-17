import {
  Controller,
  Get,
  Body,
  Headers,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProviderServiceService } from './provider-service.service';
import { CreateServiceProviderServiceDto } from './dto/create-service-provider-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-provider-service')
@Controller('service-provider-service')
export class ProviderServiceController {
  constructor(
    private readonly providerServiceService: ProviderServiceService,
  ) {}

  @Put()
  async upsert(
    @Body() dto: CreateServiceProviderServiceDto,
    @Headers('tenant-id') tenantId: string,
  ) {
    return this.providerServiceService.upsert(tenantId, dto);
  }

  @Get(':serviceProviderId/unit/:businessUnitId')
  async findByUnit(
    @Param('serviceProviderId') serviceProviderId: string,
    @Param('businessUnitId') businessUnitId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerServiceService.findByUnit(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }

  @Delete(':serviceProviderId/unit/:businessUnitId')
  async delete(
    @Param('serviceProviderId') serviceProviderId: string,
    @Param('businessUnitId') businessUnitId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerServiceService.delete(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }
}
