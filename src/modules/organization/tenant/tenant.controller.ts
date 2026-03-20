import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '@modules/utils/decorators';

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto, @UserId() userId?: string) {
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
    @UserId() userId?: string,
  ) {
    return await this.tenantService.update(id, dto, userId);
  }
}
