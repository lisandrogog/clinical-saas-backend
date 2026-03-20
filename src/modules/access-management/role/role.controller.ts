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
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '@modules/utils/decorators';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto, @UserId() userId?: string) {
    return this.roleService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Get('code/:code')
  getByCode(@Param('code') code: string) {
    return this.roleService.getByCode(code);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
    @UserId() userId?: string,
  ) {
    return this.roleService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId?: string) {
    return this.roleService.remove(id, userId);
  }
}
