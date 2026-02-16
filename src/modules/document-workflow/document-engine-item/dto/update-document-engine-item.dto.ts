import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentEngineItemDto } from './create-document-engine-item.dto';

export class UpdateDocumentEngineItemDto extends PartialType(
  CreateDocumentEngineItemDto,
) {}
