import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(
    @Body() dto: CreateTenantDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.tenantService.create(dto, userId);
  }

  @Get()
  async findAll() {
    return await this.tenantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tenantService.findOne(id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.tenantService.getByCode(code);
  }

  @Get('identification')
  async getByIdentification(
    @Query('identificationTypeId') identificationTypeId: number,
    @Query('identificationNumber') identificationNumber: string,
  ) {
    return await this.tenantService.getByIdentification(
      identificationTypeId,
      identificationNumber,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTenantDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.tenantService.update(id, dto, userId);
  }
}
