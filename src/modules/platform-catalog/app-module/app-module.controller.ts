import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { AppModuleService } from './app-module.service';
import { CreateAppModuleDto, UpdateAppModuleDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { PlatformId } from '@modules/utils/decorators';

@ApiTags('app-module')
@Controller('app-module')
export class AppModuleController {
  constructor(private readonly appModuleService: AppModuleService) {}

  @Post()
  async create(@Body() createAppModuleDto: CreateAppModuleDto) {
    return await this.appModuleService.create(createAppModuleDto);
  }

  @Get()
  async findAll(@PlatformId() platformId: string) {
    return await this.appModuleService.findAll(+platformId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appModuleService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(
    @Param('code') code: string,
    @PlatformId() platformId: string,
  ) {
    return await this.appModuleService.getByCode(code, +platformId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppModuleDto: UpdateAppModuleDto,
  ) {
    return await this.appModuleService.update(+id, updateAppModuleDto);
  }

  @Put()
  async upsert(@Body() updateAppModuleDto: UpdateAppModuleDto) {
    return await this.appModuleService.upsert(updateAppModuleDto);
  }
}
