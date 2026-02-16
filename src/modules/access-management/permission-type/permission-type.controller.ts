import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { PermissionTypeService } from './permission-type.service';
import { CreatePermissionTypeDto } from './dto/create-permission-type.dto';
import { UpdatePermissionTypeDto } from './dto/update-permission-type.dto';

@Controller('permission-type')
export class PermissionTypeController {
  constructor(private readonly permissionTypeService: PermissionTypeService) {}

  @Post()
  async create(@Body() dto: CreatePermissionTypeDto) {
    return await this.permissionTypeService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.permissionTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionTypeService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.permissionTypeService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionTypeDto) {
    return await this.permissionTypeService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdatePermissionTypeDto) {
    return await this.permissionTypeService.upsert(dto);
  }
}
