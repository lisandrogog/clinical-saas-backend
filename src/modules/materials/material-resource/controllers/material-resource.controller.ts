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
  MaterialResourceService,
  MaterialResourceActivationService,
} from '../services';
import {
  CreateMaterialResourceDto,
  UpdateMaterialResourceDto,
} from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import {
  ApiCreateMaterialResource,
  ApiDisableMaterialResource,
  ApiEnableMaterialResource,
  ApiGetAllMaterialResources,
  ApiGetMaterialResourceByCode,
  ApiGetMaterialResourceById,
  ApiRemoveMaterialResource,
  ApiUpdateMaterialResource,
} from './material-resource.decorator';

@ApiTags('material-resource')
@ApiCommonDecorator()
@Controller('material-resource')
export class MaterialResourceController {
  constructor(
    private readonly materialResourceService: MaterialResourceService,
    private readonly materialResourceActivationService: MaterialResourceActivationService,
  ) {}

  @Post()
  @ApiCreateMaterialResource()
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateMaterialResourceDto,
    @UserId() userId?: string,
  ) {
    return await this.materialResourceService.create(tenantId, payload, userId);
  }

  @Get()
  @ApiGetAllMaterialResources()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.materialResourceService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiGetMaterialResourceById()
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return await this.materialResourceService.findOne(tenantId, id);
  }

  @Get('code/:code')
  @ApiGetMaterialResourceByCode()
  async findOneByCode(
    @TenantId() tenantId: string,
    @Param('code') code: string,
  ) {
    return await this.materialResourceService.findByCode(tenantId, code);
  }

  @Patch(':id')
  @ApiUpdateMaterialResource()
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMaterialResourceDto: UpdateMaterialResourceDto,
    @UserId() userId?: string,
  ) {
    return await this.materialResourceService.update(
      tenantId,
      id,
      updateMaterialResourceDto,
      userId,
    );
  }

  @Patch(':id/disable')
  @ApiDisableMaterialResource()
  async disable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.materialResourceActivationService.disable(
      tenantId,
      id,
      userId,
    );
  }

  @Patch(':id/enable')
  @ApiEnableMaterialResource()
  async enable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.materialResourceActivationService.enable(
      tenantId,
      id,
      userId,
    );
  }

  @Delete(':id')
  @ApiRemoveMaterialResource()
  async remove(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.materialResourceService.remove(tenantId, id, userId);
  }
}
