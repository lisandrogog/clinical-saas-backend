import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DocumentEngineItemService } from './document-engine-item.service';
import { CreateDocumentEngineItemDto } from './dto/create-document-engine-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('document-engine-item')
@Controller('document-engine-item')
export class DocumentEngineItemController {
  constructor(
    private readonly documentEngineItemService: DocumentEngineItemService,
  ) {}

  @Post()
  async create(
    @Body() createDocumentEngineItemDto: CreateDocumentEngineItemDto,
  ) {
    return await this.documentEngineItemService.create(
      createDocumentEngineItemDto,
    );
  }

  @Get('all/:documentEngineId')
  async findAll(@Param('documentEngineId') documentEngineId: string) {
    return await this.documentEngineItemService.findAll(documentEngineId);
  }

  @Delete('all/:documentEngineId')
  async removeAll(@Param('documentEngineId') documentEngineId: string) {
    return await this.documentEngineItemService.removeAll(documentEngineId);
  }
}
