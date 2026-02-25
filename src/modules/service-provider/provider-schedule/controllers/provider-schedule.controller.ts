import {
  Controller,
  Get,
  Headers,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProviderScheduleService } from '../services/provider-schedule.service';
import { CreateServiceProviderScheduleDto } from '../dto/create-service-provider-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiUpsertProviderSchedule,
  ApiGetProviderScheduleByUnit,
  ApiRemoveProviderSchedule,
} from './provider-schedule.decorator';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { TenantId } from '@modules/utils/decorators';

@ApiTags('service-provider-schedule')
@ApiCommonDecorator()
@Controller('service-provider-schedule')
export class ProviderScheduleController {
  constructor(
    private readonly providerScheduleService: ProviderScheduleService,
  ) {}

  @Put()
  @ApiUpsertProviderSchedule()
  async create(
    @Body() dto: CreateServiceProviderScheduleDto,
    @TenantId() tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.providerScheduleService.upsert(
      tenantId,
      businessUnitId,
      dto,
    );
  }

  @Get(':serviceProviderId/unit/:businessUnitId')
  @ApiGetProviderScheduleByUnit()
  async findByUnit(
    @Param('serviceProviderId', ParseUUIDPipe) serviceProviderId: string,
    @Param('businessUnitId', ParseUUIDPipe) businessUnitIdParam: string,
    @TenantId() tenantId: string,
  ) {
    return await this.providerScheduleService.findByUnit(
      tenantId,
      businessUnitIdParam,
      serviceProviderId,
    );
  }

  @Delete(':serviceProviderId/unit/:businessUnitId')
  @ApiRemoveProviderSchedule()
  async delete(
    @Param('serviceProviderId', ParseUUIDPipe) serviceProviderId: string,
    @Param('businessUnitId', ParseUUIDPipe) businessUnitIdParam: string,
    @TenantId() tenantId: string,
  ) {
    return await this.providerScheduleService.delete(
      tenantId,
      businessUnitIdParam,
      serviceProviderId,
    );
  }
}
