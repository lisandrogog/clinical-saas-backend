import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceService.create(tenantId, createServiceDto, userId);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.serviceService.findAll(tenantId);
  }

  @Get('category/:categoryId')
  async getAllByCategory(
    @Param('categoryId') categoryId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceService.getAllByCategory(tenantId, categoryId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceService.findOne(id, tenantId);
  }

  @Get('code/:code')
  async getByCode(
    @Param('code') code: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceService.getByCode(code, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceService.update(
      id,
      tenantId,
      updateServiceDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceService.remove(id, tenantId, userId);
  }
}
