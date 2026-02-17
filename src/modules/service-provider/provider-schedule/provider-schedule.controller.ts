import {
  Controller,
  Get,
  Body,
  Headers,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProviderScheduleService } from './provider-schedule.service';
import { CreateServiceProviderScheduleDto } from './dto/create-service-provider-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-provider-schedule')
@Controller('service-provider-schedule')
export class ProviderScheduleController {
  constructor(
    private readonly providerScheduleService: ProviderScheduleService,
  ) {}

  @Put()
  async create(
    @Body() dto: CreateServiceProviderScheduleDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.providerScheduleService.upsert(
      tenantId,
      businessUnitId,
      dto,
    );
  }

  @Get(':serviceProviderId/unit/:businessUnitId')
  async findByUnit(
    @Param('serviceProviderId') serviceProviderId: string,
    @Param('businessUnitId') businessUnitId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerScheduleService.findByUnit(
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
    return await this.providerScheduleService.delete(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }
}
