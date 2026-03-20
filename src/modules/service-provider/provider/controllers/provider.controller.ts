import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  CreateServiceProviderDto,
  UpdateServiceProviderDto,
} from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { ProviderService, ProviderActivationService } from '../services';
import {
  ApiCreateProvider,
  ApiDisableProvider,
  ApiEnableProvider,
  ApiGetAllProviders,
  ApiGetProviderById,
  ApiRemoveProvider,
  ApiUpdateProvider,
} from './provider.decorator';
import { TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('service-provider')
@ApiCommonDecorator()
@Controller('service-provider')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly providerActivationService: ProviderActivationService,
  ) {}

  @Post()
  @ApiCreateProvider()
  async create(
    @TenantId() tenantId: string,
    @Body() dto: CreateServiceProviderDto,
    @UserId() userId?: string,
  ) {
    return await this.providerService.create(tenantId, dto, userId);
  }

  @Get()
  @ApiGetAllProviders()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.providerService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiGetProviderById()
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.providerService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiUpdateProvider()
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateServiceProviderDto,
    @UserId() userId?: string,
  ) {
    return await this.providerService.update(tenantId, id, dto, userId);
  }

  @Patch(':id/disable')
  @ApiDisableProvider()
  async disable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.providerActivationService.disable(tenantId, id, userId);
  }

  @Patch(':id/enable')
  @ApiEnableProvider()
  async enable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.providerActivationService.enable(tenantId, id, userId);
  }

  @Delete(':id')
  @ApiRemoveProvider()
  async remove(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.providerService.remove(tenantId, id, userId);
  }
}
