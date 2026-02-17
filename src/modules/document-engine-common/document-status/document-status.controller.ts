import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { DocumentStatusService } from './document-status.service';
import { CreateDocumentStatusDto } from './dto/create-document-status.dto';
import { UpdateDocumentStatusDto } from './dto/update-document-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('document-status')
@Controller('document-status')
export class DocumentStatusController {
  constructor(private readonly documentStatusService: DocumentStatusService) {}

  @Post()
  async create(@Body() dto: CreateDocumentStatusDto) {
    return await this.documentStatusService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.documentStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentStatusService.findOne(+id);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string) {
    return await this.documentStatusService.getByCode(code);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentStatusDto: UpdateDocumentStatusDto,
  ) {
    return await this.documentStatusService.update(
      +id,
      updateDocumentStatusDto,
    );
  }

  @Put()
  async upsert(@Body() dto: UpdateDocumentStatusDto) {
    return await this.documentStatusService.upsert(dto);
  }
}
