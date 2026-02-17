import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentEngineService } from './document-engine.service';
import { CreateDocumentEngineDto } from './dto/create-document-engine.dto';
import { UpdateDocumentEngineDto } from './dto/update-document-engine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('document-engine')
@Controller('document-engine')
export class DocumentEngineController {
  constructor(private readonly documentEngineService: DocumentEngineService) {}

  @Post()
  async create(@Body() createDocumentEngineDto: CreateDocumentEngineDto) {
    return await this.documentEngineService.create(createDocumentEngineDto);
  }

  @Get()
  async getDefaults() {
    return await this.documentEngineService.getDefaults();
  }

  @Get(':documentTypeId')
  async getDefault(@Param('documentTypeId') documentTypeId: string) {
    return await this.documentEngineService.getDefault(+documentTypeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentEngineService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDocumentEngineDto) {
    return await this.documentEngineService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.documentEngineService.remove(id);
  }
}
