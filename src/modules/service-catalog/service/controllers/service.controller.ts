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
import { CreateServiceDto, UpdateServiceDto, SearchServiceDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { TenantId, UserId } from '@modules/utils/decorators';
import { ServiceService, ServiceActivationService } from '../services';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateService,
  ApiDeleteService,
  ApiDisableService,
  ApiEnableService,
  ApiGetOneServiceByCode,
  ApiGetOneServiceById,
  ApiGetServices,
  ApiUpdateService,
} from './service.decorator';

@ApiTags('service')
@ApiCommonDecorator()
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly serviceActivationService: ServiceActivationService,
  ) {}

  @Post()
  @ApiCreateService()
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateServiceDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceService.create(tenantId, payload, userId);
  }

  @Get()
  @ApiGetServices()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: SearchServiceDto,
  ) {
    return await this.serviceService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiGetOneServiceById()
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.serviceService.findOne(tenantId, id);
  }

  @Get('code/:code')
  @ApiGetOneServiceByCode()
  async getByCode(@TenantId() tenantId: string, @Param('code') code: string) {
    return await this.serviceService.getByCode(tenantId, code);
  }

  @Patch(':id')
  @ApiUpdateService()
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateServiceDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceService.update(tenantId, id, payload, userId);
  }

  @Patch(':id/disable')
  @ApiDisableService()
  async disable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.serviceActivationService.disable(tenantId, id, userId);
  }

  @Patch(':id/enable')
  @ApiEnableService()
  async enable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.serviceActivationService.enable(tenantId, id, userId);
  }

  @Delete(':id')
  @ApiDeleteService()
  async remove(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.serviceService.remove(tenantId, id, userId);
  }
}
