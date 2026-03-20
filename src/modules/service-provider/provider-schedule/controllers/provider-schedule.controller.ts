import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProviderScheduleService } from '../services/provider-schedule.service';
import { CreateServiceProviderScheduleDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiUpsertProviderSchedule,
  ApiGetProviderScheduleByUnit,
  ApiRemoveProviderSchedule,
} from './provider-schedule.decorator';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { TenantId, BusinessUnitId } from '@modules/utils/decorators';

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
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: CreateServiceProviderScheduleDto,
  ) {
    return await this.providerScheduleService.upsert(
      tenantId,
      businessUnitId,
      payload,
    );
  }

  @Get(':serviceProviderId/unit')
  @ApiGetProviderScheduleByUnit()
  async findByUnit(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceProviderId', ParseUUIDPipe) serviceProviderId: string,
  ) {
    return await this.providerScheduleService.findByUnit(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }

  @Delete(':serviceProviderId/unit')
  @ApiRemoveProviderSchedule()
  async delete(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceProviderId', ParseUUIDPipe) serviceProviderId: string,
  ) {
    return await this.providerScheduleService.delete(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }
}
