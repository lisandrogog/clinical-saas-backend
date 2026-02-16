import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentEngineDto } from './create-document-engine.dto';

export class UpdateDocumentEngineDto extends PartialType(
  CreateDocumentEngineDto,
) {}
