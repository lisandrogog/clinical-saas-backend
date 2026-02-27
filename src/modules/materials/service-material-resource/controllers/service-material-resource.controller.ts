import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ServiceMaterialResourceService } from '../services/service-material-resource.service';
import { CreateServiceMaterialResourceDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiDeleteServiceMaterialResource,
  ApiFindServiceMaterialResource,
  ApiUpsertServiceMaterialResource,
} from './service-material-resource.decorator';
import { TenantId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('service-material-resource')
@ApiCommonDecorator()
@Controller('service-material-resource')
export class ServiceMaterialResourceController {
  constructor(
    private readonly serviceMaterialResourceService: ServiceMaterialResourceService,
  ) {}

  @Put()
  @ApiUpsertServiceMaterialResource()
  async upsert(
    @TenantId() tenantId: string,
    @Body() payload: CreateServiceMaterialResourceDto,
  ) {
    return this.serviceMaterialResourceService.upsert(tenantId, payload);
  }

  @Get(':serviceId')
  @ApiFindServiceMaterialResource()
  async findByService(
    @TenantId() tenantId: string,
    @Param('serviceId') serviceId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.serviceMaterialResourceService.findByService(
      tenantId,
      query,
      serviceId,
    );
  }

  @Delete(':serviceId/material/:materialResourceId')
  @ApiDeleteServiceMaterialResource()
  async delete(
    @TenantId() tenantId: string,
    @Param('serviceId') serviceId: string,
    @Param('materialResourceId') materialResourceId: string,
  ) {
    return await this.serviceMaterialResourceService.delete(
      tenantId,
      serviceId,
      materialResourceId,
    );
  }
}
