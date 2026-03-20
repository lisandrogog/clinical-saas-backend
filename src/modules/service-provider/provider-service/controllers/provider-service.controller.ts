import {
  Controller,
  Get,
  Body,
  Headers,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProviderServiceService } from '../services/provider-service.service';
import { CreateServiceProviderServiceDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiDeleteProviderService,
  ApiFindProviderServiceByUnit,
  ApiUpsertProviderService,
} from './provider-service.decorator';
import { TenantId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('service-provider-service')
@ApiCommonDecorator()
@Controller('service-provider-service')
export class ProviderServiceController {
  constructor(
    private readonly providerServiceService: ProviderServiceService,
  ) {}

  @Put()
  @ApiUpsertProviderService()
  async upsert(
    @TenantId() tenantId: string,
    @Body() payload: CreateServiceProviderServiceDto,
  ) {
    return this.providerServiceService.upsert(tenantId, payload);
  }

  @Get(':serviceProviderId/unit/:businessUnitId')
  @ApiFindProviderServiceByUnit()
  async findByUnit(
    @TenantId() tenantId: string,
    @Param('serviceProviderId') serviceProviderId: string,
    @Param('businessUnitId') businessUnitId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.providerServiceService.findByUnit(
      tenantId,
      businessUnitId,
      query,
      serviceProviderId,
    );
  }

  @Delete(':serviceProviderId/unit/:businessUnitId')
  @ApiDeleteProviderService()
  async delete(
    @TenantId() tenantId: string,
    @Param('serviceProviderId') serviceProviderId: string,
    @Param('businessUnitId') businessUnitId: string,
  ) {
    return await this.providerServiceService.delete(
      tenantId,
      businessUnitId,
      serviceProviderId,
    );
  }
}
