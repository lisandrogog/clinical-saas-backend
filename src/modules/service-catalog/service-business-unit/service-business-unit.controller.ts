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
import { ServiceBusinessUnitService } from './service-business-unit.service';
import { CreateServiceBusinessUnitDto } from './dto/create-service-business-unit.dto';
import { UpdateServiceBusinessUnitDto } from './dto/update-service-business-unit.dto';

@Controller('service-business-unit')
export class ServiceBusinessUnitController {
  constructor(
    private readonly serviceBusinessUnitService: ServiceBusinessUnitService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateServiceBusinessUnitDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceBusinessUnitService.create(tenantId, dto, userId);
  }

  @Get('units/:serviceId')
  async getUnits(
    @Param('serviceId') serviceId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceBusinessUnitService.getUnits(serviceId, tenantId);
  }

  @Get('services/:businessUnitId')
  async getServices(
    @Param('businessUnitId') businessUnitId: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceBusinessUnitService.getServices(
      businessUnitId,
      tenantId,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceBusinessUnitService.findOne(id, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceBusinessUnitDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.serviceBusinessUnitService.update(
      id,
      tenantId,
      dto,
      userId,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.serviceBusinessUnitService.delete(id, tenantId);
  }
}
