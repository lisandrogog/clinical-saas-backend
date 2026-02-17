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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto, @Headers('user-id') userId?: string) {
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
    @Headers('user-id') userId?: string,
  ) {
    return this.roleService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user-id') userId?: string) {
    return this.roleService.remove(id, userId);
  }
}
