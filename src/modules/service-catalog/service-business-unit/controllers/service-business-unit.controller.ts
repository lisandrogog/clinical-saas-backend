import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  AssociateServicesDto,
  AssociateUnitsDto,
  CreateServiceBusinessUnitDto,
  UpdateServiceBusinessUnitDto,
} from '@shared-common';
import { TenantId, UserId } from '@modules/utils/decorators';
import { ApiTags } from '@nestjs/swagger';
import {
  ServiceBusinessUnitService,
  ServiceBusinessUnitAssociationService,
} from '../services';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import {
  ApiAssociateServices,
  ApiAssociateUnits,
  ApiCreateServiceBusinessUnit,
  ApiDeleteServiceBusinessUnit,
  ApiGetOneServiceBusinessUnitById,
  ApiGetServicesByUnit,
  ApiGetUnitsByService,
  ApiUpdateServiceBusinessUnit,
} from './service-business-unit.decorator';

@ApiTags('service-business-unit')
@ApiCommonDecorator()
@Controller('service-business-unit')
export class ServiceBusinessUnitController {
  constructor(
    private readonly serviceBusinessUnitService: ServiceBusinessUnitService,
    private readonly serviceBusinessUnitAssociationService: ServiceBusinessUnitAssociationService,
  ) {}

  @Post()
  @ApiCreateServiceBusinessUnit()
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateServiceBusinessUnitDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceBusinessUnitService.create(
      tenantId,
      payload,
      userId,
    );
  }

  @Get('units/:serviceId')
  @ApiGetUnitsByService()
  async getUnits(
    @TenantId() tenantId: string,
    @Param('serviceId') serviceId: string,
    @Query() searchFilters: BaseSearchPaginationDto,
  ) {
    return await this.serviceBusinessUnitService.getUnits(
      tenantId,
      serviceId,
      searchFilters,
    );
  }

  @Get('services/:businessUnitId')
  @ApiGetServicesByUnit()
  async getServices(
    @TenantId() tenantId: string,
    @Param('businessUnitId') businessUnitId: string,
    @Query() searchFilters: BaseSearchPaginationDto,
  ) {
    return await this.serviceBusinessUnitService.getServices(
      tenantId,
      businessUnitId,
      searchFilters,
    );
  }

  @Get(':id')
  @ApiGetOneServiceBusinessUnitById()
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return await this.serviceBusinessUnitService.findOne(tenantId, id);
  }

  @Patch('associate-services')
  @ApiAssociateServices()
  async associateServices(
    @TenantId() tenantId: string,
    @Body() payload: AssociateServicesDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceBusinessUnitAssociationService.associateServices(
      tenantId,
      payload,
      userId,
    );
  }

  @Patch('associate-units')
  @ApiAssociateUnits()
  async associateUnits(
    @TenantId() tenantId: string,
    @Body() payload: AssociateUnitsDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceBusinessUnitAssociationService.associateUnits(
      tenantId,
      payload,
      userId,
    );
  }

  @Patch(':id')
  @ApiUpdateServiceBusinessUnit()
  async update(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() payload: UpdateServiceBusinessUnitDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceBusinessUnitService.update(
      tenantId,
      id,
      payload,
      userId,
    );
  }

  @Delete(':id')
  @ApiDeleteServiceBusinessUnit()
  async delete(@TenantId() tenantId: string, @Param('id') id: string) {
    return await this.serviceBusinessUnitService.delete(id, tenantId);
  }
}
