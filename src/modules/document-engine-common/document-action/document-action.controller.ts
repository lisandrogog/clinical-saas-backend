import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { DocumentActionService } from './document-action.service';
import { CreateDocumentActionDto } from './dto/create-document-action.dto';
import { UpdateDocumentActionDto } from './dto/update-document-action.dto';

@Controller('document-action')
export class DocumentActionController {
  constructor(private readonly documentActionService: DocumentActionService) {}

  @Post()
  async create(@Body() dto: CreateDocumentActionDto) {
    return await this.documentActionService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.documentActionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentActionService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.documentActionService.getByCode(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDocumentActionDto) {
    return await this.documentActionService.update(+id, dto);
  }

  @Put()
  async upsert(@Body() dto: UpdateDocumentActionDto) {
    return await this.documentActionService.upsert(dto);
  }
}
