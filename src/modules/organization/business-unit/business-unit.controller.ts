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
import { BusinessUnitService } from './business-unit.service';
import { CreateBusinessUnitDto } from './dto/create-business-unit.dto';
import { UpdateBusinessUnitDto } from './dto/update-business-unit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('business-unit')
@Controller('business-unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @Post()
  async create(
    @Body() createBusinessUnitDto: CreateBusinessUnitDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.businessUnitService.create(createBusinessUnitDto, userId);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.businessUnitService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.businessUnitService.findOne(id, tenantId);
  }

  @Get('code/:code')
  async getByCode(
    @Param('code') code: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.businessUnitService.getByCode(code, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessUnitDto: UpdateBusinessUnitDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
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
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.businessUnitService.remove(id, tenantId, userId);
  }
}
