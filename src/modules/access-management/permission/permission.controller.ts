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
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @Body() dto: CreatePermissionDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.permissionService.create(dto, userId);
  }

  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionService.findOne(id);
  }

  @Get('role/:roleId')
  async findByRoleId(@Param('roleId') roleId: string) {
    return await this.permissionService.findByRoleId(roleId);
  }

  @Get('module/:moduleId')
  async findByModuleId(@Param('moduleId') moduleId: string) {
    return await this.permissionService.findByModuleId(+moduleId);
  }

  @Get('sub-module/:subModuleId')
  async findBySubModuleId(@Param('subModuleId') subModuleId: string) {
    return await this.permissionService.findBySubModuleId(+subModuleId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.permissionService.update(id, updatePermissionDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('user-id') userId?: string) {
    return await this.permissionService.remove(id, userId);
  }
}
