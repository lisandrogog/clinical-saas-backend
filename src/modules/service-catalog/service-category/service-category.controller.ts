import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateServiceCategoryDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceCategoryService.create(tenantId, dto, userId);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.serviceCategoryService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceCategoryService.findOne(id, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceCategoryDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceCategoryService.update(id, tenantId, dto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceCategoryService.remove(id, tenantId, userId);
  }
}
