import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Put,
} from '@nestjs/common';
import { AppSubModuleService } from './app-sub-module.service';
import { CreateAppSubModuleDto } from './dto/create-app-sub-module.dto';
import { UpdateAppSubModuleDto } from './dto/update-app-sub-module.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-sub-module')
@Controller('app-sub-module')
export class AppSubModuleController {
  constructor(private readonly appSubModuleService: AppSubModuleService) {}

  @Post()
  async create(@Body() dto: CreateAppSubModuleDto) {
    return await this.appSubModuleService.create(dto);
  }

  @Get()
  async findAll(@Headers('app-module-id') appModuleId: string) {
    return await this.appSubModuleService.findAll(+appModuleId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appSubModuleService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(
    @Param('code') code: string,
    @Headers('app-module-id') appModuleId: string,
  ) {
    return await this.appSubModuleService.getByCode(code, +appModuleId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAppSubModuleDto) {
    return await this.appSubModuleService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateAppSubModuleDto) {
    return await this.appSubModuleService.upsert(dto);
  }
}
