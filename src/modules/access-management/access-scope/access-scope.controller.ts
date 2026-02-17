import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { AccessScopeService } from './access-scope.service';
import { CreateAccessScopeDto } from './dto/create-access-scope.dto';
import { UpdateAccessScopeDto } from './dto/update-access-scope.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('access-scope')
@Controller('access-scope')
export class AccessScopeController {
  constructor(private readonly accessScopeService: AccessScopeService) {}

  @Post()
  async create(@Body() dto: CreateAccessScopeDto) {
    return await this.accessScopeService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.accessScopeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accessScopeService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.accessScopeService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAccessScopeDto) {
    return await this.accessScopeService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateAccessScopeDto) {
    return await this.accessScopeService.upsert(dto);
  }
}
