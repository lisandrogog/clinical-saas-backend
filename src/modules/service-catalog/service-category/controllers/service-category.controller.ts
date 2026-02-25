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
import { ServiceCategoryService } from '../services/service-category.service';
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from '../dto';
import { TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateServiceCategory,
  ApiGetAllServiceCategories,
  ApiGetServiceCategoryById,
  ApiGetServiceCategoryByCode,
  ApiUpdateServiceCategory,
  ApiRemoveServiceCategory,
} from './service-category.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-category')
@ApiCommonDecorator()
@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Post()
  @ApiCreateServiceCategory()
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateServiceCategoryDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceCategoryService.create(tenantId, payload, userId);
  }

  @Get()
  @ApiGetAllServiceCategories()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.serviceCategoryService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiGetServiceCategoryById()
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.serviceCategoryService.findOne(tenantId, id);
  }

  @Get('code/:code')
  @ApiGetServiceCategoryByCode()
  async findOneByCode(
    @TenantId() tenantId: string,
    @Param('code') code: string,
  ) {
    return await this.serviceCategoryService.getOneByCode(tenantId, code);
  }

  @Patch(':id')
  @ApiUpdateServiceCategory()
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateServiceCategoryDto,
    @UserId() userId?: string,
  ) {
    return await this.serviceCategoryService.update(
      tenantId,
      id,
      payload,
      userId,
    );
  }

  @Delete(':id')
  @ApiRemoveServiceCategory()
  async remove(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.serviceCategoryService.remove(tenantId, id, userId);
  }
}
