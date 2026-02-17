import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('document-type')
@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  async create(@Body() dto: CreateDocumentTypeDto) {
    return await this.documentTypeService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.documentTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentTypeService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.documentTypeService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDocumentTypeDto) {
    return await this.documentTypeService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateDocumentTypeDto) {
    return await this.documentTypeService.upsert(dto);
  }
}
