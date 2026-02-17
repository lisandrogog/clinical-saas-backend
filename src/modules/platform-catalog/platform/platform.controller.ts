import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('platform')
@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  async create(@Body() dto: CreatePlatformDto) {
    return await this.platformService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.platformService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.platformService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.platformService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePlatformDto) {
    return await this.platformService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdatePlatformDto) {
    return await this.platformService.upsert(dto);
  }
}
