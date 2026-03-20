import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { CreateBusinessUnitDto, UpdateBusinessUnitDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { TenantId, UserId } from '@modules/utils/decorators';

@ApiTags('business-unit')
@Controller('business-unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @Post()
  async create(
    @Body() createBusinessUnitDto: CreateBusinessUnitDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitService.create(createBusinessUnitDto, userId);
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return await this.businessUnitService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.businessUnitService.findOne(id, tenantId);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string, @TenantId() tenantId: string) {
    return await this.businessUnitService.getByCode(code, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessUnitDto: UpdateBusinessUnitDto,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitService.update(
      id,
      tenantId,
      updateBusinessUnitDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitService.remove(id, tenantId, userId);
  }
}
