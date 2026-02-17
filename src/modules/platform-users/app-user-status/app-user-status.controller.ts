import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { AppUserStatusService } from './app-user-status.service';
import { CreateAppUserStatusDto } from './dto/create-app-user-status.dto';
import { UpdateAppUserStatusDto } from './dto/update-app-user-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-user-status')
@Controller('app-user-status')
export class AppUserStatusController {
  constructor(private readonly appUserStatusService: AppUserStatusService) {}

  @Post()
  async create(@Body() dto: CreateAppUserStatusDto) {
    return await this.appUserStatusService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.appUserStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appUserStatusService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.appUserStatusService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAppUserStatusDto) {
    return await this.appUserStatusService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateAppUserStatusDto) {
    return await this.appUserStatusService.upsert(dto);
  }
}
