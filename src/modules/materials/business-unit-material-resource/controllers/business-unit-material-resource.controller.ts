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
import { BusinessUnitMaterialResourceService } from '../services';
import {
  CreateBusinessUnitMaterialResourceDto,
  UpdateBusinessUnitMaterialResourceDto,
} from '@shared-common';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateMaterialResource,
  ApiDeleteBusinessUnitMaterialResource,
  ApiGetBusinessUnitMaterialResourceById,
  ApiGetUnitsByMaterial,
  ApiUpdateBusinessUnitMaterialResource,
} from './business-unit-material-resource.decorator';
import { BusinessUnitId, TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('business-unit-material-resource')
@ApiCommonDecorator()
@Controller('business-unit-material-resource')
export class BusinessUnitMaterialResourceController {
  constructor(
    private readonly businessUnitMaterialResourceService: BusinessUnitMaterialResourceService,
  ) {}

  @Post()
  @ApiCreateMaterialResource()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: CreateBusinessUnitMaterialResourceDto,
    @UserId() userId: string,
  ) {
    return await this.businessUnitMaterialResourceService.create(
      tenantId,
      businessUnitId,
      payload,
      userId,
    );
  }

  @Get('units')
  @ApiGetUnitsByMaterial()
  async getUnitsByMaterial(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Query() query: Omit<BaseSearchPaginationDto, 'search'>,
  ) {
    return await this.businessUnitMaterialResourceService.getUnits(
      tenantId,
      businessUnitId,
      query,
    );
  }

  @Get('materials')
  @ApiGetUnitsByMaterial()
  async getMaterialsByUnit(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.businessUnitMaterialResourceService.getMaterials(
      tenantId,
      businessUnitId,
      query,
    );
  }

  @Get(':id')
  @ApiGetBusinessUnitMaterialResourceById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.businessUnitMaterialResourceService.getBusinessUnitMaterialResourceById(
      tenantId,
      businessUnitId,
      id,
    );
  }

  @Patch(':id')
  @ApiUpdateBusinessUnitMaterialResource()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateBusinessUnitMaterialResourceDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitMaterialResourceService.update(
      tenantId,
      businessUnitId,
      id,
      payload,
      userId,
    );
  }

  @Delete(':id')
  @ApiDeleteBusinessUnitMaterialResource()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.businessUnitMaterialResourceService.remove(
      tenantId,
      businessUnitId,
      id,
    );
  }
}
