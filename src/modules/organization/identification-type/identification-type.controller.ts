import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { IdentificationTypeService } from './identification-type.service';
import { CreateIdentificationTypeDto } from './dto/create-identification-type.dto';
import { UpdateIdentificationTypeDto } from './dto/update-identification-type.dto';

@Controller('identification-type')
export class IdentificationTypeController {
  constructor(
    private readonly identificationTypeService: IdentificationTypeService,
  ) {}

  @Post()
  async create(@Body() dto: CreateIdentificationTypeDto) {
    return await this.identificationTypeService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.identificationTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.identificationTypeService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.identificationTypeService.getByCode(code);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateIdentificationTypeDto,
  ) {
    return await this.identificationTypeService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateIdentificationTypeDto) {
    return await this.identificationTypeService.upsert(dto);
  }
}
